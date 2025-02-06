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
    const { userType, userData } = body

    // Validate required fields based on user type
    if (!userData.username || !userData.email || !userData.user_detail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let endpoint = ""
    switch (userType) {
      case "admin":
        endpoint = "/users/administrators/create"
        break
      case "agent":
        if (!userData.store_detail || !userData.store_setting) {
          return NextResponse.json({ error: "Missing store details for agent" }, { status: 400 })
        }
        endpoint = "/users/agents/create"
        break
      case "cashier":
        endpoint = "/users/cashiers/create"
        break
      default:
        return NextResponse.json({ error: "Invalid user type" }, { status: 400 })
    }

    const response = await fetch(
      `${BASE_URL}${endpoint}`,
      {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        cache: "no-store",
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("API Error:", response.status, errorData)
      return NextResponse.json(
        { error: `Failed to create user: ${response.status} ${response.statusText}` },
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
