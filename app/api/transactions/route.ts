import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { cookies } from "next/headers"

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
    const pageNumber = parseInt(searchParams.get("pageNumber") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "10")

    // Mock transaction data
    const mockTransactions = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      transaction_type: i % 2 === 0 ? "DEPOSIT" : "WITHDRAWAL",
      amount: Math.random() * 1000,
      status: "COMPLETED",
      created_date: new Date(Date.now() - i * 86400000).toISOString(),
      description: `Transaction #${i + 1}`,
      reference_number: `TXN${String(i + 1).padStart(6, '0')}`,
      sender: {
        id: 1,
        name: "John Doe"
      },
      recipient: {
        id: 2,
        name: "Jane Smith"
      }
    }))

    const response = {
      total_records: 100,
      page_number: pageNumber,
      page_size: pageSize,
      data: mockTransactions
    }

    return NextResponse.json(response)
    
  } catch (error) {
    console.error("Server Error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
