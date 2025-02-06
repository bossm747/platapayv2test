"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AIAssistant } from "@/components/ai-assistant"

export function ChatModal() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <>
      <Button
        className="fixed bottom-24 right-8 md:bottom-8 h-12 w-12 rounded-full bg-[#5a2c7f] hover:bg-[#482164] shadow-lg z-50"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className="sm:max-w-[500px] h-[85vh] sm:h-[600px] w-[95vw] sm:w-full overflow-hidden bg-gradient-to-b from-purple-50 to-white border border-purple-100 shadow-xl"
          onInteractOutside={(e) => {
            if (isLoading) {
              e.preventDefault()
            }
          }}
        >
          <div className="flex flex-col h-full">
            <DialogHeader className="pb-2">
              <DialogTitle className="text-lg font-semibold text-purple-900">PlataPay Assistant</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-hidden">
              <AIAssistant hideHeader />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
