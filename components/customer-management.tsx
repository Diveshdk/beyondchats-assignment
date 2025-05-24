"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  MessageCircle,
  Star,
  Calendar,
  Edit,
} from "lucide-react"

export function CustomerManagement() {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

  const customers = [
    {
      id: "CUST-001",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      joinDate: "2023-06-15",
      totalOrders: 12,
      totalSpent: "$2,450.00",
      loyaltyTier: "Gold",
      lastOrder: "2024-01-18",
      supportTickets: 3,
      satisfaction: 4.8,
      status: "Active",
      recentOrders: [
        { id: "#ORD-123", date: "2024-01-18", amount: "$299.99", status: "Delivered" },
        { id: "#ORD-122", date: "2024-01-10", amount: "$149.99", status: "Delivered" },
        { id: "#ORD-121", date: "2023-12-28", amount: "$89.99", status: "Delivered" },
      ],
      recentTickets: [
        { id: "#TKT-001", subject: "Refund request", status: "Resolved", date: "2024-01-15" },
        { id: "#TKT-002", subject: "Product inquiry", status: "Closed", date: "2023-12-20" },
      ],
    },
    {
      id: "CUST-002",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      joinDate: "2022-03-10",
      totalOrders: 28,
      totalSpent: "$5,680.00",
      loyaltyTier: "Platinum",
      lastOrder: "2024-01-20",
      supportTickets: 5,
      satisfaction: 4.9,
      status: "Active",
      recentOrders: [
        { id: "#ORD-125", date: "2024-01-20", amount: "$199.99", status: "In Transit" },
        { id: "#ORD-124", date: "2024-01-12", amount: "$399.99", status: "Delivered" },
        { id: "#ORD-123", date: "2024-01-05", amount: "$79.99", status: "Delivered" },
      ],
      recentTickets: [
        { id: "#TKT-003", subject: "Product not working", status: "In Progress", date: "2024-01-19" },
        { id: "#TKT-004", subject: "Shipping delay", status: "Resolved", date: "2024-01-10" },
      ],
    },
    {
      id: "CUST-003",
      name: "Bob Wilson",
      email: "bob.wilson@email.com",
      phone: "+1 (555) 456-7890",
      address: "789 Pine St, Chicago, IL 60601",
      joinDate: "2023-01-20",
      totalOrders: 8,
      totalSpent: "$1,240.00",
      loyaltyTier: "Silver",
      lastOrder: "2024-01-15",
      supportTickets: 2,
      satisfaction: 4.5,
      status: "Active",
      recentOrders: [
        { id: "#ORD-120", date: "2024-01-15", amount: "$159.99", status: "Processing" },
        { id: "#ORD-119", date: "2024-01-08", amount: "$89.99", status: "Delivered" },
        { id: "#ORD-118", date: "2023-12-22", amount: "$199.99", status: "Delivered" },
      ],
      recentTickets: [{ id: "#TKT-005", subject: "Billing inquiry", status: "Pending", date: "2024-01-16" }],
    },
  ]

  const getLoyaltyColor = (tier: string) => {
    switch (tier) {
      case "Platinum":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
      case "Gold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Silver":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
      case "Suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
    }
  }

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customer Management</h1>
          <p className="text-gray-600 dark:text-gray-400">View and manage customer information and history</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-2xl">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="rounded-2xl">
            <User className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="rounded-3xl border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search customers..." className="pl-10 rounded-2xl" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48 rounded-2xl">
                <SelectValue placeholder="Loyalty Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-48 rounded-2xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customers List */}
        <Card className="rounded-3xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>Click on a customer to view detailed information</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[600px] overflow-y-auto">
              {customers.map((customer, index) => (
                <div
                  key={index}
                  className={`p-6 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors ${
                    selectedCustomer?.id === customer.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{customer.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{customer.email}</p>
                        <p className="text-xs text-gray-500">{customer.id}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge className={`${getLoyaltyColor(customer.loyaltyTier)} text-xs`}>
                        {customer.loyaltyTier}
                      </Badge>
                      <Badge className={`${getStatusColor(customer.status)} text-xs`}>{customer.status}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                    <div>
                      <span className="flex items-center gap-1">
                        <ShoppingCart className="w-3 h-3" />
                        {customer.totalOrders} orders
                      </span>
                    </div>
                    <div>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {customer.supportTickets} tickets
                      </span>
                    </div>
                    <div>
                      <span>Total: {customer.totalSpent}</span>
                    </div>
                    <div>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {customer.satisfaction}/5
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Details */}
        {selectedCustomer ? (
          <div className="space-y-6">
            {/* Customer Info */}
            <Card className="rounded-3xl border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedCustomer.name}</CardTitle>
                    <CardDescription>{selectedCustomer.id}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-2xl">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedCustomer.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Member since {selectedCustomer.joinDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                    <p className="font-semibold">{selectedCustomer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
                    <p className="font-semibold">{selectedCustomer.totalSpent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Loyalty Tier</p>
                    <Badge className={`${getLoyaltyColor(selectedCustomer.loyaltyTier)}`}>
                      {selectedCustomer.loyaltyTier}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{selectedCustomer.satisfaction}/5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Activity */}
            <Card className="rounded-3xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Customer Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="orders" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2 rounded-2xl">
                    <TabsTrigger value="orders" className="rounded-xl">
                      Recent Orders
                    </TabsTrigger>
                    <TabsTrigger value="tickets" className="rounded-xl">
                      Support Tickets
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="orders" className="space-y-3">
                    {selectedCustomer.recentOrders.map((order: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <ShoppingCart className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{order.id}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{order.amount}</p>
                          <Badge variant="secondary" className="text-xs">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="tickets" className="space-y-3">
                    {selectedCustomer.recentTickets.map((ticket: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{ticket.subject}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {ticket.id} • {ticket.date}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {ticket.status}
                        </Badge>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardContent className="flex items-center justify-center h-full p-12">
              <div className="text-center">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Customer</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a customer from the list to view their detailed information and history.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
