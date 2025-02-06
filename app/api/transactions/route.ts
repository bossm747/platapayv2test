import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get("auth_token")

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Here you would typically call your backend API to fetch transactions
    // For this example, we'll just return mock data
    const transactions = [
      {
        id: "1",
        amount: "₱1,999.00",
        status: "complete",
        email: "m.ross@example.com",
        date: "2023-06-01",
      },
      {
        id: "2",
        amount: "₱799.00",
        status: "processing",
        email: "r.pearson@example.com",
        date: "2023-06-02",
      },
      {
        id: "3",
        amount: "₱4,999.00",
        status: "complete",
        email: "h.simpson@example.com",
        date: "2023-06-03",
      },
      {
        id: "4",
        amount: "₱599.00",
        status: "failed",
        email: "d.palmer@example.com",
        date: "2023-06-04",
      },
    ]

    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Fetch transactions error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { cookies } from "next/headers"

const BASE_URL = "https://platapay-api-uat.azurewebsites.net/api"

export async function GET(request: Request) {
  try {
    const cookieStore = cookies()
    const tokenCookie = cookieStore.get("auth_token")
    const headersList = headers()
    const authHeader = headersList.get("Authorization")
    
    const token = tokenCookie?.value || authHeader?.split(" ")[1]
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized - No token provided" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const pageNumber = searchParams.get("pageNumber") || "1"
    const pageSize = searchParams.get("pageSize") || "10"

    const response = await fetch(
      `${BASE_URL}/transactions?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("API Error:", response.status, errorData)
      return NextResponse.json(
        { error: `Failed to fetch transactions: ${response.status} ${response.statusText}` },
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
