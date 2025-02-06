import { NextResponse } from "next/server"
import { headers } from "next/headers"

const BASE_URL = "https://platapay-api-uat.azurewebsites.net/api"

export async function GET(request: Request) {
  const headersList = headers()
  const token = headersList.get("Authorization")?.split(" ")[1]

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const pageNumber = searchParams.get("pageNumber") || "1"
  const pageSize = searchParams.get("pageSize") || "10"

  try {
    console.log("Fetching users from API with token:", token ? token.substring(0, 10) + "..." : "No token")
    const response = await fetch(`${BASE_URL}/users/agents?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log("API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API error response:", errorText)
      throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("API response data:", JSON.stringify(data).substring(0, 200) + "...") // Log first 200 chars of response
    return NextResponse.json(data)
  } catch (error) {
    console.error("Fetch users error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unexpected error occurred" },
      { status: 500 },
    )
  }
}

