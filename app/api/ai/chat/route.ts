import { NextResponse } from "next/server"
import { OpenAI } from "openai"
import { headers } from "next/headers"
import { cookies } from "next/headers"

const BASE_URL = "https://platapay-api-uat.azurewebsites.net/api"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const SYSTEM_PROMPT = `You are PlataPay's AI Assistant. You help users with PlataPay services and can perform actions like checking balances, creating users, and handling transactions.

Available API endpoints:
- GET /users/agents - Get list of agents
- POST /users/create - Create new users (admin/agent/cashier)
- POST /wallets/funds/transfer - Transfer funds between users
- POST /wallets/funds/create - Add funds to wallet
- GET /users/agents/{id}/cashiers - Get cashiers under an agent

About PlataPay:
PlataPay is a digital payment solution that enables secure and convenient financial transactions. It offers services like fund transfers, e-loading, and bill payments through a network of agents and cashiers.`

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

    const { messages } = await request.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
      tools: [
        {
          type: "function",
          function: {
            name: "getAgents",
            description: "Get a list of PlataPay agents",
            parameters: {
              type: "object",
              properties: {
                pageNumber: {
                  type: "number",
                  description: "Page number for pagination"
                },
                pageSize: {
                  type: "number",
                  description: "Number of items per page"
                }
              }
            }
          }
        },
        {
          type: "function",
          function: {
            name: "transferFunds",
            description: "Transfer funds between users",
            parameters: {
              type: "object",
              properties: {
                destination_user_id: {
                  type: "number",
                  description: "ID of the user receiving the funds"
                },
                amount: {
                  type: "number",
                  description: "Amount to transfer"
                }
              },
              required: ["destination_user_id", "amount"]
            }
          }
        }
      ]
    })

    return NextResponse.json(completion.choices[0].message)
    
  } catch (error) {
    console.error("AI Assistant Error:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
