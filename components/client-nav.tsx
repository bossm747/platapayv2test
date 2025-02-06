"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ResponsiveNav } from "@/components/responsive-nav"
import { ChatModal } from "@/components/chat-modal"

interface ClientNavProps {
  children: React.ReactNode
}

export function ClientNav({ children }: ClientNavProps) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  const isPublicPage = !mounted || !pathname || pathname === '/' || pathname?.includes('/login') || pathname?.includes('/activate')

  if (isPublicPage) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-b from-purple-50 to-white">
        {children}
      </main>
    )
  }

  return (
    <>
      <div className="flex h-full">
        <ResponsiveNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 md:ml-64 pb-20 md:pb-6 mt-16 md:mt-0 bg-indigo-50">
          {children}
        </main>
      </div>
      <ChatModal />
    </>
  )
}
