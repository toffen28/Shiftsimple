import { createServerSupabaseClient } from '@/lib/supabase'
import { cookies } from 'next/headers'

export interface ServerProfile {
  id: string
  org_id: string
  full_name: string | null
}

export async function getServerUser() {
  const cookieStore = cookies()
  const supabase = createServerSupabaseClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getServerProfile(): Promise<ServerProfile | null> {
  const user = await getServerUser()
  if (!user) return null

  const cookieStore = cookies()
  const supabase = createServerSupabaseClient(cookieStore)
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, org_id, full_name')
    .eq('id', user.id)
    .single()

  return profile as ServerProfile | null
}