import { createServerSupabaseClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getServerUser() {
  const cookieStore = cookies()
  const supabase = createServerSupabaseClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getServerProfile() {
  const user = await getServerUser()
  if (!user) return null

  const cookieStore = cookies()
  const supabase = createServerSupabaseClient(cookieStore)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*, organizations(*)')
    .eq('id', user.id)
    .single()

  return profile
}
