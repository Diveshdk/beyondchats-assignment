"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Search, Filter, Download, Eye, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react"

export function Orders() {
  const [searchTerm, setSearchTerm] = useState("")

  const orders = [
    {
      id: "#ORD-001",
      product: "Wireless Bluetooth Headphones",
      image: "/placeholder.svg?height=60&width=60",
      status: "Delivered",
      amount: "$299.99",
      date: "2024-01-20",
      tracking: "TRK123456789",
      estimatedDelivery: "2024-01-22",
      items: 1,
    },
    {
      id: "#ORD-002",
      product: "Smart Fitness Watch",
      image: "/placeholder.svg?height=60&width=60",
      status: "In Transit",
      amount: "$199.99",
      date: "2024-01-18",
      tracking: "TRK987654321",
      estimatedDelivery: "2024-01-25",
      items: 1,
    },
    {
      id: "#ORD-003",
      product: "Ergonomic Laptop Stand",
      image: "/placeholder.svg?height=60&width=60",
      status: "Processing",
      amount: "$79.99",
      date: "2024-01-15",
      tracking: "TRK456789123",
      estimatedDelivery: "2024-01-28",
      items: 2,
    },
    {
      id: "#ORD-004",
      product: "USB-C Hub with HDMI",
      image: "/placeholder.svg?height=60&width=60",
      status: "Cancelled",
      amount: "$49.99",
      date: "2024-01-10",
      tracking: null,
      estimatedDelivery: null,
      items: 1,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-4 h-4" />
      case "In Transit":
        return <Truck className="w-4 h-4" />
      case "Processing":
        return <Clock className="w-4 h-4" />
      case "Cancelled":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "In Transit":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "Processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your order history</p>
        </div>
        <Button className="rounded-2xl">
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Filters */}
      <Card className="rounded-3xl border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-2xl"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48 rounded-2xl">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="rounded-2xl">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 rounded-2xl">
          <TabsTrigger value="all" className="rounded-xl">
            All Orders
          </TabsTrigger>
          <TabsTrigger value="active" className="rounded-xl">
            Active
          </TabsTrigger>
          <TabsTrigger value="delivered" className="rounded-xl">
            Delivered
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="rounded-xl">
            Cancelled
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredOrders.map((order, index) => (
            <Card key={index} className="rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Product Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{order.product}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span>{order.id}</span>
                        <span>•</span>
                        <span>
                          {order.items} item{order.items > 1 ? "s" : ""}
                        </span>
                        <span>•</span>
                        <span>{order.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-4">
                    <Badge className={`${getStatusColor(order.status)} rounded-xl px-3 py-1`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{order.status}</span>
                    </Badge>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className="text-xl font-bold">{order.amount}</p>
                    {order.tracking && <p className="text-sm text-gray-600 dark:text-gray-400">{order.tracking}</p>}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-2xl">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    {order.status === "In Transit" && (
                      <Button size="sm" className="rounded-2xl">
                        <Truck className="w-4 h-4 mr-2" />
                        Track
                      </Button>
                    )}
                  </div>
                </div>

                {/* Delivery Info */}
                {order.estimatedDelivery && order.status !== "Delivered" && order.status !== "Cancelled" && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Estimated delivery: {order.estimatedDelivery}
                      </span>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <Truck className="w-4 h-4" />
                        <span>Track package</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active">
          <div className="text-center py-12">
            <Clock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Active Orders</h3>
            <p className="text-gray-600 dark:text-gray-400">Orders that are currently being processed or in transit</p>
          </div>
        </TabsContent>

        <TabsContent value="delivered">
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Delivered Orders</h3>
            <p className="text-gray-600 dark:text-gray-400">Your successfully delivered orders</p>
          </div>
        </TabsContent>

        <TabsContent value="cancelled">
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Cancelled Orders</h3>
            <p className="text-gray-600 dark:text-gray-400">Orders that have been cancelled</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
