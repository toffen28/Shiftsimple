import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Admin client with service role key — bypasses RLS
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
    const { userId, orgName } = await req.json()

    if (!userId || !orgName) {
      return NextResponse.json({ error: 'Missing userId or orgName' }, { status: 400 })
    }

    const supabase = getAdminClient()

    // 1. Create organization (bypasses RLS via service role)
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .insert({ name: orgName })
      .select()
      .single()

    if (orgError) {
      console.error('Org creation error:', orgError)
      return NextResponse.json({ error: orgError.message }, { status: 500 })
    }

    // 2. Update the existing profile with org_id (profile was auto-created by auth trigger)
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ org_id: orgData.id })
      .eq('id', userId)

    if (profileError) {
      console.error('Profile update error:', profileError)
      // Try to insert profile if update fails (e.g. trigger didn't fire)
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({ id: userId, org_id: orgData.id })

      if (insertError) {
        console.error('Profile insert error:', insertError)
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, orgId: orgData.id })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Signup API error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}