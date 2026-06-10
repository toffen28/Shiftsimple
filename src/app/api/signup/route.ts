import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

export async function POST(req: Request) {
  try {
    const { email, password, orgName } = await req.json()

    if (!email || !password || !orgName) {
      return NextResponse.json({
        error: 'E-post, passord og bedriftsnavn er påkrevd.'
      }, { status: 400 })
    }

    const supabase = getAdminClient()

    // 1. Create auth user via admin API — auto-confirms email, no confirmation needed
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) {
      let message = authError.message
      if (message.includes('already registered')) {
        message = 'Denne e-posten er allerede registrert. Prøv å logge inn i stedet.'
      }
      return NextResponse.json({ error: message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Kunne ikke opprette bruker. Prøv igjen.' }, { status: 500 })
    }

    const userId = authData.user.id

    // 2. Create organization
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .insert({ name: orgName })
      .select()
      .single()

    if (orgError) {
      // Org creation failed — clean up the auth user we just created
      await supabase.auth.admin.deleteUser(userId)
      return NextResponse.json({
        error: 'Kunne ikke opprette organisasjon. Vennligst prøv igjen.'
      }, { status: 500 })
    }

    // 3. Create profile and link to org
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ id: userId, org_id: orgData.id })

    if (profileError) {
      // Profile creation failed — try updating instead (profile might already exist from trigger)
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ org_id: orgData.id })
        .eq('id', userId)

      if (updateError) {
        // Clean up everything
        await supabase.from('organizations').delete().eq('id', orgData.id)
        await supabase.auth.admin.deleteUser(userId)
        return NextResponse.json({
          error: 'Kunne ikke fullføre registreringen. Vennligst prøv igjen.'
        }, { status: 500 })
      }
    }

    return NextResponse.json({
      success: true,
      email: email,
      message: 'Bruker opprettet. Du kan nå logge inn.',
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Ukjent feil'
    console.error('Signup error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}