import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Username and password are required" }, { status: 400 })
    }

    // Call the external API to authenticate
    const response = await fetch("https://platapay-api-uat.azurewebsites.net/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { success: false, error: errorData.message || "Authentication failed" },
        { status: response.status },
      )
    }

    const data = await response.json()

    // Set the token in an HTTP-only cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 7 * 24 * 60 * 60, // 1 week
      path: "/",
    }

    const apiResponse = NextResponse.json({
      success: true,
      user_id: data.user_id,
      username: data.username,
      role: data.role,
    })
    apiResponse.cookies.set("auth_token", data.token, cookieOptions)

    return apiResponse
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "An unexpected error occurred" }, { status: 500 })
  }
}

