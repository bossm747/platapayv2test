"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  mobile_number: string
  created_date: string
  last_login_ip: string | null
  store_name: string
}

interface UserResponse {
  total_records: number
  page_number: number
  page_size: number
  data: User[]
}

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ username: "", email: "", role: "" })
  const [totalRecords, setTotalRecords] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("create")
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    console.log("UsersPage component mounted")
    const token = localStorage.getItem("auth_token")
    console.log("Auth token present:", !!token)
  }, [])

  useEffect(() => {
    if (user?.role === "Admin" && activeTab === "list") {
      console.log("Attempting to fetch users")
      fetchUsers()
    }
  }, [user, activeTab, pageNumber, pageSize])

  const fetchUsers = async () => {
    if (loading) return
    setLoading(true)
    try {
      const token = localStorage.getItem("auth_token")
      if (!token) {
        throw new Error("No authentication token found")
      }
      console.log("Fetching users with token:", token.substring(0, 10) + "...") // Log partial token for debugging
      const response = await fetch(`/api/users?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        const errorText = await response.text()
        console.error("API response error:", response.status, errorText)
        throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`)
      }
      const data: UserResponse = await response.json()
      console.log("Fetched users data:", data) // Log the fetched data
      setUsers(data.data)
      setTotalRecords(data.total_records)
    } catch (error) {
      console.error("Fetch users error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch users. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implementation for creating a new user (unchanged)
  }

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage)
  }

  const handlePageSizeChange = (newSize: string) => {
    setPageSize(Number.parseInt(newSize))
    setPageNumber(1)
  }

  if (user?.role !== "Admin") {
    return <div>You do not have permission to view this page.</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">User Management</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Create User</TabsTrigger>
          <TabsTrigger value="list">User List</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New User</CardTitle>
              <CardDescription>Add a new administrator, agent, or cashier</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Administrator</SelectItem>
                      <SelectItem value="Agent">Agent</SelectItem>
                      <SelectItem value="Cashier">Cashier</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Create User
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>User List</CardTitle>
              <CardDescription>Manage existing users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <Label htmlFor="pageSize">Show</Label>
                  <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                    <SelectTrigger className="w-[100px] ml-2">
                      <SelectValue placeholder="Page Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="ml-2">entries</span>
                </div>
                <div>
                  <Button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1 || loading}>
                    Previous
                  </Button>
                  <span className="mx-2">
                    Page {pageNumber} of {Math.ceil(totalRecords / pageSize)}
                  </span>
                  <Button
                    onClick={() => handlePageChange(pageNumber + 1)}
                    disabled={pageNumber >= Math.ceil(totalRecords / pageSize) || loading}
                  >
                    Next
                  </Button>
                </div>
              </div>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Mobile Number</TableHead>
                      <TableHead>Store Name</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Last Login IP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                        <TableCell>{user.mobile_number}</TableCell>
                        <TableCell>{user.store_name}</TableCell>
                        <TableCell>{new Date(user.created_date).toLocaleString()}</TableCell>
                        <TableCell>{user.last_login_ip || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

