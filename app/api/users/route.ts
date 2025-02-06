import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { cookies } from "next/headers"

const BASE_URL = "https://platapay-api-uat.azurewebsites.net/api"

export async function GET(request: Request) {
  try {
    // Get token from cookies first
    const cookieStore = cookies()
    const tokenCookie = cookieStore.get("auth_token")
    
    // Then check Authorization header as fallback
    const headersList = headers()
    const authHeader = headersList.get("Authorization")
    
    const token = tokenCookie?.value || authHeader?.split(" ")[1]
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized - No token provided" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const pageNumber = searchParams.get("pageNumber") || "1"
    const pageSize = searchParams.get("pageSize") || "10"

    console.log("Fetching users with token:", token.substring(0, 20) + "...")

    const response = await fetch(
      `${BASE_URL}/users/agents?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
      console.error("API Error Response:", errorData)
      return NextResponse.json(
        { error: `Failed to fetch users: ${response.status} ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log("API Success Response:", JSON.stringify(data).substring(0, 200) + "...")
    
    return NextResponse.json(data)
    
  } catch (error) {
    console.error("Server Error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

