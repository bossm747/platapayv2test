"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Send, Bot } from "lucide-react"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

interface AIAssistantProps {
  hideHeader?: boolean
  onLoadingChange?: (loading: boolean) => void
}

export function AIAssistant({ hideHeader = false, onLoadingChange }: AIAssistantProps) {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = React.useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    try {
      setIsLoading(true)
      onLoadingChange?.(true)
      const newMessages = [...messages, { role: "user", content: input }]
      setMessages(newMessages)
      setInput("")

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify({ messages: newMessages })
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()
      setMessages([...newMessages, data])

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from assistant",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
      onLoadingChange?.(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border border-purple-100 bg-white/80 backdrop-blur-sm">
      {!hideHeader && (
        <CardHeader className="bg-gradient-to-r from-purple-900 to-purple-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot size={24} className="animate-pulse" />
            PlataPay Assistant
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-2 sm:p-4 h-full">
        <div className="h-[calc(100%-80px)] overflow-y-auto mb-4 space-y-4 px-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg animate-fadeIn ${
                message.role === "user"
                  ? "bg-[#dbcbe5] ml-auto max-w-[80%] shadow-md"
                  : "bg-white mr-auto max-w-[80%] shadow-md border border-purple-100/50"
              }`}
            >
              {message.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about PlataPay services..."
            disabled={isLoading}
            className="flex-1 border-0 focus-visible:ring-1 focus-visible:ring-purple-500"
          />
          <Button 
            type="submit" 
            size="icon"
            className="bg-[#5a2c7f] hover:bg-[#482164] rounded-full w-10 h-10 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin">⚪</span>
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
