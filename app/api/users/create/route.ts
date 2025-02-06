import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get("auth_token")

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // In a real application, you would verify the token and get the user's role
  // For this example, we'll assume the user is an Admin
  const currentUserRole = "Admin"

  if (currentUserRole !== "Admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const { username, email, role } = await request.json()

    // Here you would typically call your backend API to create a new user
    // For this example, we'll just simulate a successful response
    const newUser = {
      id: Math.floor(Math.random() * 1000) + 5,
      username,
      email,
      role,
    }

    return NextResponse.json(newUser)
  } catch (error) {
    console.error("Create user error:", error)
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
    const { userType } = body

    let endpoint = ""
    switch (userType) {
      case "admin":
        endpoint = "/users/administrators/create"
        break
      case "agent":
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
        body: JSON.stringify(body.userData),
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
