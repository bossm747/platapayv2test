import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get("auth_token")

  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 })
  }

  try {
    // Call the external API to validate the token
    const response = await fetch("https://platapay-api-uat.azurewebsites.net/api/auth/login/validate", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: errorData.message || "Token validation failed" }, { status: response.status })
    }

    const userData = await response.json()
    return NextResponse.json(userData)
  } catch (error) {
    console.error("Token validation error:", error)
    return NextResponse.json({ error: "An unexpected error occurred during token validation" }, { status: 500 })
  }
}

