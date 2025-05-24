"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle, Eye, RotateCcw } from "lucide-react"

export function OrderLookup() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [searchResults, setSearchResults] = useState<any>(null)

  const handleSearch = () => {
    // Simulate order lookup
    if (orderNumber.toLowerCase().includes("ord-12345") || orderNumber === "12345") {
      setSearchResults({
        orderNumber: "#ORD-12345",
        status: "Delivered",
        orderDate: "2024-01-15",
        deliveryDate: "2024-01-20",
        total: "$299.99",
        items: [
          {
            name: "Wireless Bluetooth Headphones",
            quantity: 1,
            price: "$299.99",
            image: "/placeholder.svg?height=60&width=60",
          },
        ],
        tracking: "TRK123456789",
        shippingAddress: "123 Main St, City, State 12345",
        paymentMethod: "•••• 4242",
      })
    } else {
      setSearchResults("not_found")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "In Transit":
        return <Truck className="w-5 h-5 text-blue-600" />
      case "Processing":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "Cancelled":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Package className="w-5 h-5 text-gray-600" />
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

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Order Lookup</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your orders and get delivery updates</p>
      </div>

      {/* Search Form */}
      <Card className="rounded-3xl border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Find Your Order
          </CardTitle>
          <CardDescription>Enter your order number and email to track your order</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderNumber">Order Number</Label>
              <Input
                id="orderNumber"
                placeholder="e.g., ORD-12345 or 12345"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl"
              />
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full rounded-2xl" disabled={!orderNumber || !email}>
            <Search className="w-4 h-4 mr-2" />
            Track Order
          </Button>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults === "not_found" && (
        <Card className="rounded-3xl border-0 shadow-lg border-red-200 dark:border-red-800">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Order Not Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We couldn't find an order with that number and email combination.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Double-check your order number and email address</p>
              <p>• Order numbers usually start with "ORD-" or are 5-6 digits</p>
              <p>• Make sure you're using the email address from your order confirmation</p>
            </div>
            <Button variant="outline" className="mt-4 rounded-2xl">
              Need Help? Contact Support
            </Button>
          </CardContent>
        </Card>
      )}

      {searchResults && searchResults !== "not_found" && (
        <div className="space-y-6">
          {/* Order Status */}
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(searchResults.status)}
                    Order {searchResults.orderNumber}
                  </CardTitle>
                  <CardDescription>Placed on {searchResults.orderDate}</CardDescription>
                </div>
                <Badge className={`${getStatusColor(searchResults.status)} rounded-xl px-4 py-2`}>
                  {searchResults.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Timeline */}
              <div className="space-y-4">
                <h4 className="font-semibold">Order Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-green-50 dark:bg-green-900/20">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-green-800 dark:text-green-200">Delivered</p>
                      <p className="text-sm text-green-600 dark:text-green-300">{searchResults.deliveryDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-blue-800 dark:text-blue-200">In Transit</p>
                      <p className="text-sm text-blue-600 dark:text-blue-300">2024-01-18</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                    <Package className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-medium">Order Confirmed</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{searchResults.orderDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tracking Info */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tracking Number</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{searchResults.tracking}</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Eye className="w-4 h-4 mr-2" />
                    Track Package
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Items */}
              <div>
                <h4 className="font-semibold mb-3">Items Ordered</h4>
                <div className="space-y-3">
                  {searchResults.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium">{item.name}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Shipping Address</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{searchResults.shippingAddress}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Payment Method</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Card ending in {searchResults.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">{searchResults.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4">Need Help with This Order?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Button variant="outline" className="rounded-2xl justify-start">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Request Return
                </Button>
                <Button variant="outline" className="rounded-2xl justify-start">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
                <Button variant="outline" className="rounded-2xl justify-start">
                  <Package className="w-4 h-4 mr-2" />
                  Reorder Items
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Help */}
      <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Common Questions</h3>
          <div className="space-y-2 text-sm">
            <p className="text-blue-600 dark:text-blue-300">• Where can I find my order number?</p>
            <p className="text-blue-600 dark:text-blue-300">• How long does shipping take?</p>
            <p className="text-blue-600 dark:text-blue-300">• Can I change my delivery address?</p>
            <p className="text-blue-600 dark:text-blue-300">• What's your return policy?</p>
          </div>
          <Button variant="outline" className="mt-4 rounded-2xl">
            View FAQ
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
