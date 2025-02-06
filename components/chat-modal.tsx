"use client"

import { useState } from "react"
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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-[#5a2c7f] hover:bg-[#482164]"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>PlataPay Assistant</DialogTitle>
          </DialogHeader>
          <AIAssistant />
        </DialogContent>
      </Dialog>
    </>
  )
}
