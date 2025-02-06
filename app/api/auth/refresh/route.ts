import { NextResponse } from "next/server"
import { headers } from "next/headers"

const BASE_URL = "https://platapay-api-uat.azurewebsites.net/api"

export async function POST(request: Request) {
  const headersList = headers()
  const token = headersList.get("Authorization")?.split(" ")[1]

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to refresh token")
    }

    const data = await response.json()
    return NextResponse.json({ token: data.token })
  } catch (error) {
    console.error("Token refresh error:", error)
    return NextResponse.json({ error: "Failed to refresh token" }, { status: 401 })
  }
}

