"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface ClientNavProps {
  children: React.ReactNode
}

export function ClientNav({ children }: ClientNavProps) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isAuthPage = pathname?.includes('/login') || pathname?.includes('/activate')

  if (isAuthPage) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-purple-50 to-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </main>
    )
  }

  return (
    <>
      <div className="flex h-full">
        <ResponsiveNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 md:ml-64 pb-20 md:pb-6">
          {children}
        </main>
      </div>
      <ChatModal />
    </>
  )
}
