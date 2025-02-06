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

