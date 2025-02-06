"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export type User = {
  user_id: number
  username: string
  role: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  getToken: () => string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/validate", {
        method: "GET",
        credentials: "include",
      })
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        router.push("/dashboard")
      } else {
        setUser(null)
        router.push("/login")
      }
    } catch (error) {
      console.error("Session validation error:", error)
      setUser(null)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setUser({
          user_id: data.user_id,
          username: data.username,
          role: data.role,
        })
        // Save the token in localStorage
        localStorage.setItem("auth_token", data.token)
        router.push("/dashboard")
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      setLoading(false)
      router.push("/login")
    }
  }

  const getToken = () => {
    return localStorage.getItem("auth_token")
  }

  return <AuthContext.Provider value={{ user, loading, login, logout, getToken }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

