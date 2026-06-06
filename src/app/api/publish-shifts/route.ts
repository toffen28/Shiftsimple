import { NextResponse } from 'next/server'
import { getServerProfile } from '@/lib/server-utils'
import { createServerSupabaseClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { sendShiftNotification } from '@/lib/email'
import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'

export async function POST(req: Request) {
  try {
    const profile = await getServerProfile()
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { weekStart } = await req.json()
    const supabase = createServerSupabaseClient(cookies())

    // 1. Get all staff for this org
    const { data: staff } = await supabase
      .from('staff')
      .select('*')
      .eq('org_id', profile.org_id)

    if (!staff || staff.length === 0) {
      return NextResponse.json({ message: 'No staff to notify' })
    }

    // 2. Get all shifts for this week
    const { data: shifts } = await supabase
      .from('shifts')
      .select('*')
      .eq('org_id', profile.org_id)
      .eq('week_start', weekStart)

    // 3. For each staff member, send email if they have shifts
    const notifications = staff.map(async (member) => {
      if (!member.email) return

      const memberShifts = shifts?.filter(s => s.staff_id === member.id)
        .map(s => ({
          day: format(addDays(parseISO(s.week_start), s.day_of_week === 0 ? 6 : s.day_of_week - 1), 'EEEE', { locale: nb }),
          start: s.start_time,
          end: s.end_time,
          week: format(parseISO(s.week_start), 'w', { locale: nb })
        })) || []

      if (memberShifts.length > 0) {
        await sendShiftNotification(member.email, member.name, memberShifts)
      }
    })

    await Promise.all(notifications)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
