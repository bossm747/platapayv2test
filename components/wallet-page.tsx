"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function WalletPage() {
  const [addAmount, setAddAmount] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const { toast } = useToast()

  const handleAddFunds = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/wallet/add-funds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: addAmount }),
      })

      if (!response.ok) {
        throw new Error("Failed to add funds")
      }

      const data = await response.json()
      toast({
        title: "Funds Added",
        description: `₱${addAmount} has been added to your wallet.`,
      })
      setAddAmount("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add funds. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/wallet/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: transferAmount, recipient }),
      })

      if (!response.ok) {
        throw new Error("Failed to transfer funds")
      }

      const data = await response.json()
      toast({
        title: "Transfer Successful",
        description: `₱${transferAmount} has been sent to ${recipient}.`,
      })
      setTransferAmount("")
      setRecipient("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to transfer funds. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Wallet</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add Funds</CardTitle>
            <CardDescription>Add money to your PlataPay wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddFunds} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Add Funds
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transfer Funds</CardTitle>
            <CardDescription>Send money to another PlataPay user</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransfer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input
                  id="recipient"
                  placeholder="Enter recipient's email or ID"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transfer-amount">Amount</Label>
                <Input
                  id="transfer-amount"
                  placeholder="Enter amount"
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Transfer
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

