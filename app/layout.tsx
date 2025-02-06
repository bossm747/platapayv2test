import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { ResponsiveNav } from "@/components/responsive-nav"
import type React from "react"
import { ChatModal } from "@/components/chat-modal"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PlataPay - Modern Payment Solutions",
  description: "Secure and efficient payment processing platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <AuthProvider>
          {/* Conditionally render nav and chat based on pathname */}
          {typeof window !== 'undefined' && !window.location.pathname.includes('/login') ? (
            <>
              <div className="flex h-full">
                <ResponsiveNav />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 md:ml-64 pb-20 md:pb-6">
                  {children}
                </main>
              </div>
              <ChatModal />
            </>
          ) : (
            <main className="flex h-full items-center justify-center bg-gradient-to-b from-purple-50 to-white">
              {children}
            </main>
          )}
          <div id="modal-root" />
        </AuthProvider>
      </body>
    </html>
  )
}

