"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function ApiContent() {
  const [selectedEndpoint, setSelectedEndpoint] = useState("email")

  return (
    <div className="container py-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">API Documentation</h2>
        <p className="text-muted-foreground">
          Explore the PlataPay API endpoints and learn how to integrate payments into your applications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications API</CardTitle>
          <CardDescription>Send emails and SMS notifications through PlataPay</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="request" className="space-y-4">
            <TabsList>
              <TabsTrigger value="request">Request</TabsTrigger>
              <TabsTrigger value="response">Response</TabsTrigger>
            </TabsList>
            <TabsContent value="request" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Endpoint</Label>
                  <div className="flex items-center gap-2 rounded-lg border bg-muted p-2 font-mono text-sm">
                    POST /api/notifications/email
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Headers</Label>
                  <div className="rounded-lg border bg-muted p-2 font-mono text-sm">
                    Content-Type: application/json
                    <br />
                    Accept: application/json
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Request Body</Label>
                  <div className="rounded-lg border bg-muted p-2 font-mono text-sm">
                    {`{
  "to_email": "user@example.com",
  "subject": "Welcome to PlataPay",
  "message": "Your account has been created",
  "is_html": false
}`}
                  </div>
                </div>
                <Button>Try it out</Button>
              </div>
            </TabsContent>
            <TabsContent value="response">
              <div className="rounded-lg border bg-muted p-2 font-mono text-sm">
                {`{
  "success": true,
  "message": "Email sent successfully"
}`}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>User authentication and validation endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Login Endpoint</Label>
              <div className="flex items-center gap-2 rounded-lg border bg-muted p-2 font-mono text-sm">
                POST /api/auth/login
              </div>
            </div>
            <div className="space-y-2">
              <Label>Request Body</Label>
              <div className="rounded-lg border bg-muted p-2 font-mono text-sm">
                {`{
  "username": "string",
  "password": "string"
}`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

