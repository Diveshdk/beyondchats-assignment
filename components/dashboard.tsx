"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ShoppingCart, Package, Clock, Star, ArrowRight, Gift, Zap } from "lucide-react"

export function Dashboard() {
  const stats = [
    {
      title: "Total Orders",
      value: "24",
      change: "+12%",
      icon: ShoppingCart,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Active Orders",
      value: "3",
      change: "+2",
      icon: Clock,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Delivered",
      value: "21",
      change: "+5",
      icon: Package,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Loyalty Points",
      value: "1,250",
      change: "+150",
      icon: Star,
      color: "from-purple-500 to-pink-500",
    },
  ]

  const recentOrders = [
    { id: "#ORD-001", product: "Wireless Headphones", status: "Delivered", amount: "$299.99", date: "2024-01-20" },
    { id: "#ORD-002", product: "Smart Watch", status: "In Transit", amount: "$199.99", date: "2024-01-18" },
    { id: "#ORD-003", product: "Laptop Stand", status: "Processing", amount: "$79.99", date: "2024-01-15" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
          <p className="text-blue-100 mb-6">You have 3 active orders and 1,250 loyalty points waiting for you.</p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" className="rounded-2xl">
              <Gift className="w-4 h-4 mr-2" />
              Redeem Points
            </Button>
            <Button variant="outline" className="rounded-2xl border-white/20 text-white hover:bg-white/10">
              <Zap className="w-4 h-4 mr-2" />
              Quick Support
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="relative overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 rounded-3xl border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your latest purchase activity</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="rounded-2xl">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{order.product}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.id} • {order.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "default"
                          : order.status === "In Transit"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start rounded-2xl h-12" variant="outline">
                <ShoppingCart className="w-4 h-4 mr-3" />
                Track Order
              </Button>
              <Button className="w-full justify-start rounded-2xl h-12" variant="outline">
                <Package className="w-4 h-4 mr-3" />
                Browse Products
              </Button>
              <Button className="w-full justify-start rounded-2xl h-12" variant="outline">
                <Star className="w-4 h-4 mr-3" />
                Leave Review
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200">Loyalty Status</CardTitle>
              <CardDescription>Gold Member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progress to Platinum</span>
                  <span>1,250 / 2,000 pts</span>
                </div>
                <Progress value={62.5} className="h-2" />
                <p className="text-xs text-green-700 dark:text-green-300">
                  750 more points to unlock Platinum benefits!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
