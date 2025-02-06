"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Wallet, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-gradient-to-r from-purple-900 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-white">PlataPay</h1>
            <div className="flex gap-4">
              <Link href="/about">
                <Button variant="ghost" className="text-white hover:bg-white/20">About</Button>
              </Link>
              <Link href="/features">
                <Button variant="ghost" className="text-white hover:bg-white/20">Features</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost" className="text-white hover:bg-white/20">Pricing</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-white/20">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-white text-purple-900 hover:bg-white/90">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-white/30 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-900">
                <span className="animate-pulse mr-2">⚡</span> New: Instant Cross-Border Payments
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-purple-900">
                Modern Payment Solutions for Everyone
              </h2>
              <p className="text-lg text-gray-600">
                Experience lightning-fast, secure, and reliable payment processing. Perfect for businesses and individuals alike.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto bg-purple-900 text-white hover:bg-purple-800">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Watch Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <img
                      key={i}
                      src={`/avatars/${i}.png`}
                      alt={`User ${i}`}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <p>Join 10,000+ users who trust PlataPay</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Shield className="h-12 w-12 text-purple-900 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Bank-Grade Security</h3>
                <p className="text-gray-600">Advanced encryption and fraud protection for your peace of mind</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Wallet className="h-12 w-12 text-purple-900 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Wallet</h3>
                <p className="text-gray-600">Manage multiple currencies with real-time conversion rates</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Zap className="h-12 w-12 text-purple-900 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Instant Transfers</h3>
                <p className="text-gray-600">Send and receive money globally in seconds, not days</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <ArrowRight className="h-12 w-12 text-purple-900 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
                <p className="text-gray-600">Simple API integration with your existing systems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-white/50 to-purple-50/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">Trusted by Businesses Worldwide</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "PlataPay transformed how we handle payments. The integration was seamless.",
                author: "Sarah Chen",
                role: "CEO, TechCorp"
              },
              {
                quote: "The best payment solution we've used. Customer support is exceptional.",
                author: "Michael Rodriguez",
                role: "CFO, Global Retail"
              },
              {
                quote: "Security and speed - PlataPay delivers on both fronts consistently.",
                author: "David Kim",
                role: "CTO, SecureFinance"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={`/avatars/${i + 1}.png`}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-purple-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
