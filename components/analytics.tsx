"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  MessageCircle,
  Star,
  Download,
  Calendar,
  Target,
} from "lucide-react"

export function Analytics() {
  const overviewStats = [
    {
      title: "Total Tickets",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Avg Response Time",
      value: "2.4h",
      change: "-15.2%",
      trend: "down",
      icon: Clock,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Customer Satisfaction",
      value: "4.7/5",
      change: "+3.1%",
      trend: "up",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Resolution Rate",
      value: "94.2%",
      change: "+2.8%",
      trend: "up",
      icon: Target,
      color: "from-purple-500 to-pink-500",
    },
  ]

  const categoryData = [
    { category: "Refunds", tickets: 45, percentage: 28, trend: "+5%" },
    { category: "Product Issues", tickets: 38, percentage: 24, trend: "+12%" },
    { category: "Billing", tickets: 32, percentage: 20, trend: "-3%" },
    { category: "Shipping", tickets: 25, percentage: 16, trend: "+8%" },
    { category: "Account", tickets: 20, percentage: 12, trend: "-1%" },
  ]

  const agentStats = [
    {
      name: "Sarah Johnson",
      tickets: 45,
      avgResponse: "1.8h",
      satisfaction: 4.9,
      resolved: 42,
    },
    {
      name: "Mike Chen",
      tickets: 38,
      avgResponse: "2.1h",
      satisfaction: 4.7,
      resolved: 35,
    },
    {
      name: "Emily Davis",
      tickets: 52,
      avgResponse: "1.5h",
      satisfaction: 4.8,
      resolved: 48,
    },
    {
      name: "Alex Rodriguez",
      tickets: 29,
      avgResponse: "2.8h",
      satisfaction: 4.5,
      resolved: 26,
    },
  ]

  const timeData = [
    { time: "9 AM", tickets: 12 },
    { time: "10 AM", tickets: 18 },
    { time: "11 AM", tickets: 25 },
    { time: "12 PM", tickets: 22 },
    { time: "1 PM", tickets: 15 },
    { time: "2 PM", tickets: 28 },
    { time: "3 PM", tickets: 32 },
    { time: "4 PM", tickets: 20 },
    { time: "5 PM", tickets: 14 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Performance insights and support metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-2xl">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button className="rounded-2xl">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
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
                    <Badge variant={stat.trend === "up" ? "default" : "secondary"} className="text-xs">
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
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

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 rounded-2xl">
          <TabsTrigger value="overview" className="rounded-xl">
            Overview
          </TabsTrigger>
          <TabsTrigger value="categories" className="rounded-xl">
            Categories
          </TabsTrigger>
          <TabsTrigger value="agents" className="rounded-xl">
            Agents
          </TabsTrigger>
          <TabsTrigger value="trends" className="rounded-xl">
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Response Time Chart */}
            <Card className="rounded-3xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
                <CardDescription>Average response time over the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                    const times = [2.1, 1.8, 2.4, 1.9, 2.2, 3.1, 2.8]
                    const time = times[index]
                    return (
                      <div key={day} className="flex items-center justify-between">
                        <span className="text-sm font-medium w-12">{day}</span>
                        <div className="flex-1 mx-4">
                          <Progress value={(4 - time) * 25} className="h-2" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-12">{time}h</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Satisfaction Scores */}
            <Card className="rounded-3xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
                <CardDescription>Rating distribution this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const percentages = [65, 25, 7, 2, 1]
                    const percentage = percentages[5 - rating]
                    return (
                      <div key={rating} className="flex items-center gap-4">
                        <div className="flex items-center gap-1 w-16">
                          <span className="text-sm">{rating}</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <Progress value={percentage} className="h-2" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-12">{percentage}%</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Ticket Categories</CardTitle>
              <CardDescription>Breakdown of support requests by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{item.category}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.tickets} tickets</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.percentage}%</p>
                      <Badge variant={item.trend.startsWith("+") ? "default" : "secondary"} className="text-xs">
                        {item.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
              <CardDescription>Individual agent metrics and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentStats.map((agent, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{agent.tickets} tickets handled</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{agent.satisfaction}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Avg Response</p>
                        <p className="font-medium">{agent.avgResponse}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Resolved</p>
                        <p className="font-medium">{agent.resolved}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Success Rate</p>
                        <p className="font-medium">{Math.round((agent.resolved / agent.tickets) * 100)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Hourly Ticket Volume</CardTitle>
              <CardDescription>Ticket creation patterns throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeData.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-sm font-medium w-16">{item.time}</span>
                    <div className="flex-1">
                      <Progress value={(item.tickets / 35) * 100} className="h-3" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-12">{item.tickets}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
