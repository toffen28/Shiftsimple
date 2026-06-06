'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { 
  ChevronLeft,
  ChevronRight,
  Plus, 
  Send, 
  Trash2, 
  X, 
  Clock,
  Download
} from 'lucide-react'
import { 
  format, 
  addDays, 
  startOfWeek, 
  subWeeks, 
  addWeeks, 
  eachDayOfInterval
} from 'date-fns'
import { nb } from 'date-fns/locale'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

type Staff = {
  id: string
  name: string
  color: string
}

type Shift = {
  id: string
  staff_id: string
  day_of_week: number
  start_time: string
  end_time: string
  week_start: string
}

const DAYS = [
  { id: 1, name: 'Mandag' },
  { id: 2, name: 'Tirsdag' },
  { id: 3, name: 'Onsdag' },
  { id: 4, name: 'Torsdag' },
  { id: 5, name: 'Fredag' },
  { id: 6, name: 'Lørdag' },
  { id: 0, name: 'Søndag' },
]

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [staff, setStaff] = useState<Staff[]>([])
  const [shifts, setShifts] = useState<Shift[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [orgId, setOrgId] = useState<string | null>(null)
  const scheduleRef = useRef<HTMLDivElement>(null)

  // New shift form state
  const [selectedStaffId, setSelectedStaffId] = useState('')
  const [selectedDay, setSelectedDay] = useState(1)
  const [startTime, setStartTime] = useState('08:00')
  const [endTime, setEndTime] = useState('16:00')
  const [editingShiftId, setEditingShiftId] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('org_id')
        .eq('id', user.id)
        .single()

      if (profile) {
        setOrgId(profile.org_id)
        
        // Load staff
        const { data: staffData } = await supabase
          .from('staff')
          .select('id, name, color')
          .eq('org_id', profile.org_id)
          .order('name')
        
        setStaff(staffData || [])

        // Load shifts for current week
        await loadShifts(profile.org_id, currentWeek)
      }
      setLoading(false)
    }

    loadData()
  }, [currentWeek])

  async function loadShifts(organizationId: string, weekStart: Date) {
    const formattedWeekStart = format(weekStart, 'yyyy-MM-dd')
    const { data: shiftData } = await supabase
      .from('shifts')
      .select('*')
      .eq('org_id', organizationId)
      .eq('week_start', formattedWeekStart)
    
    setShifts(shiftData || [])
  }

  const handlePrevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1))
  const handleNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1))
  const handleToday = () => setCurrentWeek(startOfWeek(new Date(), { weekStartsOn: 1 }))

  const weekDays = eachDayOfInterval({
    start: currentWeek,
    end: addDays(currentWeek, 6)
  })

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId) return

    const [dayStr, staffId] = destination.droppableId.split('-')
    const newDay = parseInt(dayStr)
    const shiftId = draggableId

    // Update locally
    setShifts(shifts.map(s => s.id === shiftId ? { ...s, day_of_week: newDay } : s))

    // Update database
    await supabase
      .from('shifts')
      .update({ day_of_week: newDay })
      .eq('id', shiftId)
  }

  const handleOpenModal = (day: number, staffId?: string, shift?: Shift) => {
    if (shift) {
      setEditingShiftId(shift.id)
      setSelectedStaffId(shift.staff_id)
      setSelectedDay(shift.day_of_week)
      setStartTime(shift.start_time)
      setEndTime(shift.end_time)
    } else {
      setEditingShiftId(null)
      setSelectedStaffId(staffId || (staff[0]?.id || ''))
      setSelectedDay(day)
      setStartTime('08:00')
      setEndTime('16:00')
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orgId) return

    const shiftData = {
      org_id: orgId,
      staff_id: selectedStaffId,
      day_of_week: selectedDay,
      start_time: startTime,
      end_time: endTime,
      week_start: format(currentWeek, 'yyyy-MM-dd')
    }

    if (editingShiftId) {
      const { error } = await supabase
        .from('shifts')
        .update(shiftData)
        .eq('id', editingShiftId)

      if (!error) {
        setShifts(shifts.map(s => s.id === editingShiftId ? { ...s, ...shiftData } : s))
      }
    } else {
      const { data, error } = await supabase
        .from('shifts')
        .insert(shiftData)
        .select()
        .single()

      if (!error && data) {
        setShifts([...shifts, data])
      }
    }

    setIsModalOpen(false)
  }

  const handleDeleteShift = async (id: string) => {
    const { error } = await supabase
      .from('shifts')
      .delete()
      .eq('id', id)

    if (!error) {
      setShifts(shifts.filter(s => s.id !== id))
    }
    setIsModalOpen(false)
  }

  const exportPDF = async () => {
    if (!scheduleRef.current) return
    await exportToPDF(scheduleRef.current, `vaktliste-uke-${format(currentWeek, 'w')}.pdf`)
  }

  const handlePublish = async () => {
    try {
      const response = await fetch('/api/publish-shifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weekStart: format(currentWeek, 'yyyy-MM-dd')
        }),
      })

      if (response.ok) {
        alert('Vaktlisten er publisert og varsler er sendt til ansatte!')
      } else {
        alert('Noe gikk galt ved publisering.')
      }
    } catch (error) {
      alert('En feil oppstod.')
    }
  }

  if (loading) return <div>Laster vaktplan...</div>

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vaktplan</h1>
          <p className="text-slate-500">Planlegg vakter for uke {format(currentWeek, 'w', { locale: nb })}.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border rounded-md shadow-sm">
            <button onClick={handlePrevWeek} className="p-2 hover:bg-slate-50 border-r transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={handleToday} className="px-4 py-1 text-sm font-medium hover:bg-slate-50 transition-colors">
              I dag
            </button>
            <button onClick={handleNextWeek} className="p-2 hover:bg-slate-50 border-l transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={exportPDF}
            className="inline-flex items-center px-4 py-2 bg-white border text-slate-700 rounded-md hover:bg-slate-50 shadow-sm transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Last ned PDF
          </button>
          <button
            onClick={handlePublish}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm transition-colors"
          >
            <Send className="h-4 w-4 mr-2" />
            Publiser
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto" ref={scheduleRef}>
        <DragDropContext onDragEnd={onDragEnd}>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="py-4 px-4 text-left font-semibold text-slate-900 border-r w-48">Ansatt</th>
                {weekDays.map((day, i) => (
                  <th key={i} className="py-4 px-4 text-center font-semibold text-slate-900 border-r last:border-r-0">
                    <div className="text-xs uppercase text-slate-500 mb-1">{format(day, 'EEEE', { locale: nb })}</div>
                    <div className="text-lg">{format(day, 'd. MMM', { locale: nb })}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {staff.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    Du må <Link href="/dashboard/staff" className="text-blue-600 underline">legge til ansatte</Link> før du kan planlegge vakter.
                  </td>
                </tr>
              ) : (
                staff.map((member) => (
                  <tr key={member.id} className="group">
                    <td className="py-4 px-4 border-r bg-slate-50/50 font-medium text-slate-900 sticky left-0 z-10">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: member.color }} />
                        {member.name}
                      </div>
                    </td>
                    {DAYS.map((day) => {
                      const dayShifts = shifts.filter(s => s.staff_id === member.id && s.day_of_week === day.id)
                      return (
                        <Droppable key={`${day.id}-${member.id}`} droppableId={`${day.id}-${member.id}`}>
                          {(provided) => (
                            <td
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="py-2 px-2 border-r last:border-r-0 min-h-[80px] align-top relative hover:bg-slate-50/30 transition-colors"
                              onDoubleClick={() => handleOpenModal(day.id, member.id)}
                            >
                              <div className="space-y-2">
                                {dayShifts.map((shift, index) => (
                                  <Draggable key={shift.id} draggableId={shift.id} index={index}>
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={() => handleOpenModal(day.id, member.id, shift)}
                                        className="p-2 rounded-md text-xs font-bold shadow-sm cursor-pointer border-l-4 transition-transform active:scale-95"
                                        style={{ 
                                          backgroundColor: member.color + '20', 
                                          borderLeftColor: member.color,
                                          color: member.color 
                                        }}
                                      >
                                        <div className="flex items-center justify-between">
                                          <span>{shift.start_time} - {shift.end_time}</span>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                                <button
                                  onClick={() => handleOpenModal(day.id, member.id)}
                                  className="w-full py-1 mt-1 opacity-0 group-hover:opacity-100 flex items-center justify-center text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded transition-all"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          )}
                        </Droppable>
                      )
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </DragDropContext>
      </div>

      {/* Add/Edit Shift Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-slate-900">
                {editingShiftId ? 'Rediger vakt' : 'Legg til vakt'}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="h-6 w-6 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ansatt</label>
                <select
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  value={selectedStaffId}
                  onChange={(e) => setSelectedStaffId(e.target.value)}
                >
                  <option value="" disabled>Velg ansatt</option>
                  {staff.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dag</label>
                <select
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                >
                  {DAYS.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Starttid</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="time"
                      required
                      className="w-full rounded-md border border-slate-300 pl-10 pr-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sluttid</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="time"
                      required
                      className="w-full rounded-md border border-slate-300 pl-10 pr-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                {editingShiftId && (
                  <button
                    type="button"
                    onClick={() => handleDeleteShift(editingShiftId)}
                    className="px-4 py-2 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                    title="Slett vakt"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingShiftId ? 'Lagre' : 'Legg til'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
