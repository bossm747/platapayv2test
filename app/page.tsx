"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Wallet, Zap } from "lucide-react"

export default function LandingPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace('/dashboard')
    }
  }, [user, router])
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-purple-900">PlataPay</h1>
            <div className="flex gap-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-purple-900 text-white hover:bg-purple-800">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-purple-900">
                Modern Payment Solutions for Everyone
              </h2>
              <p className="text-lg text-gray-600">
                Secure, fast, and reliable payment processing platform for businesses and individuals.
              </p>
              <div className="flex gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-purple-900 text-white hover:bg-purple-800">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                <Shield className="h-12 w-12 text-purple-900 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure</h3>
                <p className="text-gray-600">Bank-grade security for all transactions</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                <Wallet className="h-12 w-12 text-purple-900 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Digital Wallet</h3>
                <p className="text-gray-600">Manage your funds with ease</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                <Zap className="h-12 w-12 text-purple-900 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Instant</h3>
                <p className="text-gray-600">Real-time payment processing</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                <ArrowRight className="h-12 w-12 text-purple-900 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Seamless</h3>
                <p className="text-gray-600">Easy integration with your business</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
