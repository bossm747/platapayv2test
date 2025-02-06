import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get("auth_token")

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { amount, recipient } = await request.json()

    // Here you would typically call your backend API to transfer funds
    // For this example, we'll just simulate a successful response
    const response = await fetch("https://platapay-api-uat.azurewebsites.net/api/wallet/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ amount, recipient }),
    })

    if (!response.ok) {
      throw new Error("Failed to transfer funds")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Transfer funds error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

