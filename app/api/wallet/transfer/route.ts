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

import { NextResponse } from "next/server"
import { headers } from "next/headers"

const BASE_URL = "https://platapay-api-uat.azurewebsites.net/api"

export async function POST(request: Request) {
  try {
    const headersList = headers()
    const authHeader = headersList.get("Authorization")
    
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized - No token provided" }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate request body against the API schema
    if (!body.destination_user_id || !body.amount || body.amount <= 0) {
      return NextResponse.json(
        { error: "Invalid request body - missing required fields or invalid amount" },
        { status: 400 }
      )
    }

    const response = await fetch(
      `${BASE_URL}/wallets/funds/transfer`,
      {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination_user_id: parseInt(body.recipient),
          amount: parseFloat(body.amount)
        }),
        cache: "no-store",
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("API Error:", response.status, errorData)
      return NextResponse.json(
        { error: `Failed to transfer funds: ${response.status} ${response.statusText}` },
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
