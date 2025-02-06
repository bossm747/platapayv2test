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

