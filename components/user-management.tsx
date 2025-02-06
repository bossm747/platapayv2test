"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function UserManagement() {
  const [userType, setUserType] = useState("")
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    user_detail: {
      first_name: "",
      last_name: "",
      middle_name: "",
      address: "",
      mobile_number: "",
      birth_date: ""
    },
    store_detail: {
      name: "",
      tin_number: "",
      address_number: "",
      address_street: "",
      address_subdivision: "",
      address_brgy: "",
      address_municipality: "",
      address_city: "",
      address_region: "",
      longitude: "",
      latitude: ""
    },
    store_setting: {
      max_cashiers: 0,
      max_gen_trx_amount_per_day: 0,
      max_cash_out_amount_per_day: 0,
      max_e_load_amount_per_day: 0
    }
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Validate required fields
      if (!formData.username || !formData.email) {
        toast({
          title: "Error",
          description: "Username and email are required",
          variant: "destructive",
        })
        return
      }

      if (!formData.user_detail.first_name || !formData.user_detail.last_name || 
          !formData.user_detail.address || !formData.user_detail.mobile_number) {
        toast({
          title: "Error",
          description: "All user details are required",
          variant: "destructive",
        })
        return
      }

      if (userType === "agent") {
        const requiredStoreFields = [
          'name', 'tin_number', 'address_number', 'address_street',
          'address_subdivision', 'address_brgy', 'address_municipality',
          'address_city', 'address_region', 'longitude', 'latitude'
        ]
        
        const missingFields = requiredStoreFields.filter(field => !formData.store_detail[field as keyof typeof formData.store_detail])
        if (missingFields.length > 0) {
          toast({
            title: "Error",
            description: `Missing required store fields: ${missingFields.join(', ')}`,
            variant: "destructive",
          })
          return
        }
      }
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({
          userType,
          userData: formData
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Create user error:", errorData)
        throw new Error(errorData.error || `Failed to create user: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Create user success:", data)
      toast({
        title: "Success",
        description: `User created successfully`,
      })
      
      // Reset form
      setFormData({
        username: "",
        email: "",
        user_detail: {
          first_name: "",
          last_name: "",
          middle_name: "",
          address: "",
          mobile_number: "",
          birth_date: ""
        },
        store_detail: {
          name: "",
          tin_number: "",
          address_number: "",
          address_street: "",
          address_subdivision: "",
          address_brgy: "",
          address_municipality: "",
          address_city: "",
          address_region: "",
          longitude: "",
          latitude: ""
        },
        store_setting: {
          max_cashiers: 0,
          max_gen_trx_amount_per_day: 0,
          max_cash_out_amount_per_day: 0,
          max_e_load_amount_per_day: 0
        }
      })
      setUserType("")
      
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create user",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">User Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create New User</CardTitle>
          <CardDescription>Add a new user to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userType">User Type</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="cashier">Cashier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="user_detail.first_name"
                value={formData.user_detail.first_name}
                onChange={handleInputChange}
                placeholder="Enter first name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="user_detail.last_name"
                value={formData.user_detail.last_name}
                onChange={handleInputChange}
                placeholder="Enter last name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile_number">Mobile Number</Label>
              <Input
                id="mobile_number"
                name="user_detail.mobile_number"
                value={formData.user_detail.mobile_number}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="user_detail.address"
                value={formData.user_detail.address}
                onChange={handleInputChange}
                placeholder="Enter address"
              />
            </div>

            {userType === "agent" && (
              <>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Store Details</h3>
                  <div className="space-y-2">
                    <Label htmlFor="store_name">Store Name</Label>
                    <Input
                      id="store_name"
                      name="store_detail.name"
                      value={formData.store_detail.name}
                      onChange={handleInputChange}
                      placeholder="Enter store name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tin_number">TIN Number</Label>
                    <Input
                      id="tin_number"
                      name="store_detail.tin_number"
                      value={formData.store_detail.tin_number}
                      onChange={handleInputChange}
                      placeholder="Enter TIN number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address_number">Address Number</Label>
                      <Input
                        id="address_number"
                        name="store_detail.address_number"
                        value={formData.store_detail.address_number}
                        onChange={handleInputChange}
                        placeholder="Enter address number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address_street">Street</Label>
                      <Input
                        id="address_street"
                        name="store_detail.address_street"
                        value={formData.store_detail.address_street}
                        onChange={handleInputChange}
                        placeholder="Enter street"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address_subdivision">Subdivision</Label>
                      <Input
                        id="address_subdivision"
                        name="store_detail.address_subdivision"
                        value={formData.store_detail.address_subdivision}
                        onChange={handleInputChange}
                        placeholder="Enter subdivision"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address_brgy">Barangay</Label>
                      <Input
                        id="address_brgy"
                        name="store_detail.address_brgy"
                        value={formData.store_detail.address_brgy}
                        onChange={handleInputChange}
                        placeholder="Enter barangay"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address_municipality">Municipality</Label>
                      <Input
                        id="address_municipality"
                        name="store_detail.address_municipality"
                        value={formData.store_detail.address_municipality}
                        onChange={handleInputChange}
                        placeholder="Enter municipality"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address_city">City</Label>
                      <Input
                        id="address_city"
                        name="store_detail.address_city"
                        value={formData.store_detail.address_city}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address_region">Region</Label>
                    <Input
                      id="address_region"
                      name="store_detail.address_region"
                      value={formData.store_detail.address_region}
                      onChange={handleInputChange}
                      placeholder="Enter region"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        name="store_detail.longitude"
                        value={formData.store_detail.longitude}
                        onChange={handleInputChange}
                        placeholder="Enter longitude"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        name="store_detail.latitude"
                        value={formData.store_detail.latitude}
                        onChange={handleInputChange}
                        placeholder="Enter latitude"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Store Settings</h3>
                  <div className="space-y-2">
                    <Label htmlFor="max_cashiers">Maximum Cashiers</Label>
                    <Input
                      id="max_cashiers"
                      name="store_setting.max_cashiers"
                      type="number"
                      value={formData.store_setting.max_cashiers}
                      onChange={handleInputChange}
                      placeholder="Enter maximum number of cashiers"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max_gen_trx">Max Transaction Amount per Day</Label>
                    <Input
                      id="max_gen_trx"
                      name="store_setting.max_gen_trx_amount_per_day"
                      type="number"
                      value={formData.store_setting.max_gen_trx_amount_per_day}
                      onChange={handleInputChange}
                      placeholder="Enter maximum transaction amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max_cash_out">Max Cash Out Amount per Day</Label>
                    <Input
                      id="max_cash_out"
                      name="store_setting.max_cash_out_amount_per_day"
                      type="number"
                      value={formData.store_setting.max_cash_out_amount_per_day}
                      onChange={handleInputChange}
                      placeholder="Enter maximum cash out amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max_e_load">Max E-Load Amount per Day</Label>
                    <Input
                      id="max_e_load"
                      name="store_setting.max_e_load_amount_per_day"
                      type="number"
                      value={formData.store_setting.max_e_load_amount_per_day}
                      onChange={handleInputChange}
                      placeholder="Enter maximum e-load amount"
                    />
                  </div>
                </div>
              </>
            )}

            <Button type="submit" className="w-full">
              Create User
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
