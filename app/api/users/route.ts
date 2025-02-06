import { NextResponse } from "next/server"
import { headers } from "next/headers"

const BASE_URL = "https://platapay-api-uat.azurewebsites.net/api"

export async function GET(request: Request) {
  try {
    const headersList = headers()
    const authHeader = headersList.get("Authorization")
    
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized - No token provided" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const pageNumber = searchParams.get("pageNumber") || "1"
    const pageSize = searchParams.get("pageSize") || "10"

    const response = await fetch(
      `${BASE_URL}/users/agents?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("API Error:", response.status, errorData)
      return NextResponse.json(
        { error: `Failed to fetch users: ${response.status} ${response.statusText}` },
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

