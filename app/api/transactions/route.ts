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
    const pageNumber = searchParams.get("pageNumber") || "1"
    const pageSize = searchParams.get("pageSize") || "10"

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
