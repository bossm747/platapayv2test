import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get("auth_token")

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { username, email, emailNotifications, smsNotifications } = await request.json()

    // Here you would typically call your backend API to update user settings
    // For this example, we'll just simulate a successful response
    const response = await fetch("https://platapay-api-uat.azurewebsites.net/api/settings/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ username, email, emailNotifications, smsNotifications }),
    })

    if (!response.ok) {
      throw new Error("Failed to update settings")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Update settings error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { cookies } from "next/headers"

const BASE_URL = "https://platapay-api-uat.azurewebsites.net/api"

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const tokenCookie = cookieStore.get("auth_token")
    const headersList = headers()
    const authHeader = headersList.get("Authorization")
    
    const token = tokenCookie?.value || authHeader?.split(" ")[1]
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized - No token provided" }, { status: 401 })
    }

    const body = await request.json()

    const response = await fetch(
      `${BASE_URL}/settings/update`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("API Error:", response.status, errorData)
      return NextResponse.json(
        { error: `Failed to update settings: ${response.status} ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error("Server Error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
