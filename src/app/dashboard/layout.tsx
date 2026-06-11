'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Calendar, Users, Settings, LogOut, LayoutDashboard, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Oversikt', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Vaktplan', href: '/dashboard/schedule', icon: Calendar },
    { name: 'Ansatte', href: '/dashboard/staff', icon: Users },
    { name: 'Innstillinger', href: '/dashboard/settings', icon: Settings },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <Link href="/dashboard" className="flex items-center">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-bold">ShiftSimple</span>
            </Link>
            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-6 w-6 text-slate-500" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                  `}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5 text-slate-400" />
              Logg ut
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center px-4 lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-6 w-6 text-slate-600" />
          </button>
          <span className="ml-4 font-bold">ShiftSimple</span>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div key={pathname} style={{ animation: 'pageFadeIn 250ms ease-in-out' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
