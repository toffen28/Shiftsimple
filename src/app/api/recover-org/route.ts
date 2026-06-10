import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

/**
 * POST /api/recover-org
 * Creates an organization for a user who got stuck during signup
 * (auth account exists but no organization was created)
 * 
 * Body: { userId: string, orgName?: string }
 */
export async function POST(req: Request) {
  try {
    const { userId, orgName } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const supabase = getAdminClient()

    // Check if user already has an org
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('org_id')
      .eq('id', userId)
      .single()

    if (existingProfile?.org_id) {
      return NextResponse.json({ 
        message: 'User already has an organization', 
        orgId: existingProfile.org_id 
      })
    }

    // Create organization
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .insert({ name: orgName || 'Min Restaurant' })
      .select()
      .single()

    if (orgError) {
      return NextResponse.json({ error: orgError.message }, { status: 500 })
    }

    // Link profile to org
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ org_id: orgData.id })
      .eq('id', userId)

    if (updateError) {
      // Try insert if update fails
      await supabase
        .from('profiles')
        .insert({ id: userId, org_id: orgData.id })
    }

    return NextResponse.json({ 
      success: true, 
      orgId: orgData.id,
      message: 'Organization created and linked to user'
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}