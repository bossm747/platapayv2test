import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { cookies } from "next/headers"

const BASE_URL = "https://platapay-api-uat.azurewebsites.net/api"

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const tokenCookie = cookieStore.get("auth_token")
    
    const headersList = headers()
    const authHeader = headersList.get("Authorization")
    
    const token = tokenCookie?.value || authHeader?.split(" ")[1]
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized - No token provided" }, { status: 401 })
    }

    const body = await request.json()
    
    // Add template support
    let emailContent = body.message
    if (body.template) {
      const templates = {
        welcome: (username: string) => require('@/lib/email-templates/welcome').welcomeEmailTemplate(username),
        otp: (username: string, otp: string) => require('@/lib/email-templates/otp').otpEmailTemplate(username, otp),
        passwordUpdated: (username: string) => require('@/lib/email-templates/password-updated').passwordUpdatedTemplate(username)
      }
      
      if (templates[body.template]) {
        emailContent = templates[body.template](...body.templateData)
        body.is_html = true
      }
    }

    const response = await fetch(
      `${BASE_URL}/notifications/email`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("API Error:", response.status, errorData)
      return NextResponse.json(
        { error: `Failed to send email: ${response.status} ${response.statusText}` },
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
