import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import type React from "react"
import { ClientNav } from "@/components/client-nav"

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
          <ClientNav>{children}</ClientNav>
          <div id="modal-root" />
        </AuthProvider>
      </body>
    </html>
  )
}

