import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const start = Date.now()
    const supabase = getAdminClient()

    // Trivial query to keep the database active
    const { data, error } = await supabase
      .from('organizations')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Keepalive query failed:', error.message)
      return NextResponse.json(
        { status: 'error', message: error.message, ms: Date.now() - start },
        { status: 500 }
      )
    }

    console.log(`Keepalive OK — ${data?.length || 0} orgs found in ${Date.now() - start}ms`)

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      ms: Date.now() - start,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Keepalive error:', message)
    return NextResponse.json({ status: 'error', message }, { status: 500 })
  }
}