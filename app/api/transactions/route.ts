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

