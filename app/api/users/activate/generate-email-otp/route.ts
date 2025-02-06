import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { cookies } from "next/headers"

const BASE_URL = "https://platapay-api-uat.azurewebsites.net/api"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.username || !body.email) {
      return NextResponse.json(
        { error: "Username and email are required" },
        { status: 400 }
      )
    }

    const response = await fetch(
      `${BASE_URL}/users/activate/generate-email-otp`,
      {
        method: 'POST',
        headers: {
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
        { error: `Failed to generate OTP: ${response.status} ${response.statusText}` },
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
