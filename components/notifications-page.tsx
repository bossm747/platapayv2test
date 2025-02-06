import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export function NotificationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>

      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">Send Email</TabsTrigger>
          <TabsTrigger value="sms">Send SMS</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Send Email Notification</CardTitle>
              <CardDescription>Compose and send an email to users</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="to-email">To</Label>
                  <Input id="to-email" type="email" placeholder="Enter recipient's email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter email subject" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Enter your message" rows={4} />
                </div>
                <Button className="w-full">Send Email</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle>Send SMS Notification</CardTitle>
              <CardDescription>Compose and send an SMS to users</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile-number">Mobile Number</Label>
                  <Input id="mobile-number" placeholder="Enter mobile number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-message">Message</Label>
                  <Textarea id="sms-message" placeholder="Enter your message" rows={4} />
                </div>
                <Button className="w-full">Send SMS</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

