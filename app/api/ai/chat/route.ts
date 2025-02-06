import { NextResponse } from "next/server"
import { OpenAI } from "openai"
import { headers } from "next/headers"
import { cookies } from "next/headers"

const BASE_URL = "https://platapay-api-uat.azurewebsites.net/api"

const openai = new OpenAI({
  apiKey: "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"
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
      function_call: "auto",
      tools: [
        {
          type: "function",
          function: {
            name: "getAgents",
            description: "Get a list of PlataPay agents",
            parameters: {
              type: "object",
              properties: {
                pageNumber: { type: "number", description: "Page number for pagination" },
                pageSize: { type: "number", description: "Number of items per page" }
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
                destination_user_id: { type: "number", description: "ID of the user receiving the funds" },
                amount: { type: "number", description: "Amount to transfer" }
              },
              required: ["destination_user_id", "amount"]
            }
          }
        },
        {
          type: "function",
          function: {
            name: "addFunds",
            description: "Add funds to a wallet",
            parameters: {
              type: "object",
              properties: {
                amount: { type: "number", description: "Amount to add" }
              },
              required: ["amount"]
            }
          }
        },
        {
          type: "function",
          function: {
            name: "getCashiers",
            description: "Get list of cashiers under an agent",
            parameters: {
              type: "object",
              properties: {
                agentId: { type: "number", description: "ID of the agent" }
              },
              required: ["agentId"]
            }
          }
        }
      ]
    })

    const message = completion.choices[0].message

    // Handle function calls
    if (message.tool_calls) {
      const functionResponses = await Promise.all(
        message.tool_calls.map(async (toolCall) => {
          const functionName = toolCall.function.name
          const functionArgs = JSON.parse(toolCall.function.arguments)

          let functionResult
          switch (functionName) {
            case "getAgents":
              const agentsResponse = await fetch(
                `${BASE_URL}/users/agents?pageNumber=${functionArgs.pageNumber || 1}&pageSize=${functionArgs.pageSize || 10}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  }
                }
              )
              functionResult = await agentsResponse.json()
              break

            case "transferFunds":
              const transferResponse = await fetch(
                `${BASE_URL}/wallets/funds/transfer`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(functionArgs)
                }
              )
              functionResult = await transferResponse.json()
              break

            case "addFunds":
              const addFundsResponse = await fetch(
                `${BASE_URL}/wallets/funds/create`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ amount: functionArgs.amount })
                }
              )
              functionResult = await addFundsResponse.json()
              break

            case "getCashiers":
              const cashiersResponse = await fetch(
                `${BASE_URL}/users/agents/${functionArgs.agentId}/cashiers`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  }
                }
              )
              functionResult = await cashiersResponse.json()
              break
          }

          return {
            role: "function" as const,
            name: functionName,
            content: JSON.stringify(functionResult)
          }
        })
      )

      // Get AI's response to the function results
      const secondResponse = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
          message,
          ...functionResponses
        ],
        temperature: 0.7
      })

      return NextResponse.json(secondResponse.choices[0].message)
    }

    return NextResponse.json(message)
    
  } catch (error) {
    console.error("AI Assistant Error:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
