"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  MessageCircle,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  UserCheck,
  Timer,
} from "lucide-react"

export function AdminDashboard() {
  const stats = [
    {
      title: "Total Tickets",
      value: "156",
      change: "+12%",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Pending Tickets",
      value: "23",
      change: "+5",
      icon: Clock,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Resolved Today",
      value: "45",
      change: "+18%",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Avg Response Time",
      value: "2.4h",
      change: "-15%",
      icon: Timer,
      color: "from-purple-500 to-pink-500",
    },
  ]

  const recentTickets = [
    {
      id: "#TKT-001",
      customer: "John Doe",
      subject: "Refund request for order #12345",
      status: "Open",
      priority: "High",
      agent: "Sarah Johnson",
      created: "2 hours ago",
    },
    {
      id: "#TKT-002",
      customer: "Jane Smith",
      subject: "Product not working as expected",
      status: "In Progress",
      priority: "Medium",
      agent: "Mike Chen",
      created: "4 hours ago",
    },
    {
      id: "#TKT-003",
      customer: "Bob Wilson",
      subject: "Billing inquiry",
      status: "Pending",
      priority: "Low",
      agent: "Unassigned",
      created: "6 hours ago",
    },
  ]

  const agentPerformance = [
    { name: "Sarah Johnson", tickets: 12, avgTime: "1.8h", satisfaction: 4.8 },
    { name: "Mike Chen", tickets: 8, avgTime: "2.1h", satisfaction: 4.6 },
    { name: "Emily Davis", tickets: 15, avgTime: "1.5h", satisfaction: 4.9 },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Support Dashboard 📊</h1>
          <p className="text-blue-100 mb-6">
            You have 23 pending tickets and 3 urgent issues requiring immediate attention.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" className="rounded-2xl">
              <AlertTriangle className="w-4 h-4 mr-2" />
              View Urgent Tickets
            </Button>
            <Button variant="outline" className="rounded-2xl border-white/20 text-white hover:bg-white/10">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Analytics
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
                    <Badge variant={stat.change.startsWith("+") ? "default" : "secondary"} className="text-xs">
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
        {/* Recent Tickets */}
        <Card className="lg:col-span-2 rounded-3xl border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Tickets</CardTitle>
                <CardDescription>Latest customer support requests</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="rounded-2xl">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{ticket.subject}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {ticket.id} • {ticket.customer} • {ticket.created}
                      </p>
                      <p className="text-xs text-gray-500">Agent: {ticket.agent}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        ticket.status === "Open"
                          ? "destructive"
                          : ticket.status === "In Progress"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs mb-1"
                    >
                      {ticket.status}
                    </Badge>
                    <div>
                      <Badge
                        variant={
                          ticket.priority === "High"
                            ? "destructive"
                            : ticket.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agent Performance */}
        <div className="space-y-6">
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
              <CardDescription>Today's top performers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {agentPerformance.map((agent, index) => (
                <div key={index} className="p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                      <UserCheck className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{agent.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {agent.tickets} tickets • {agent.avgTime} avg
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <span className="text-xs">⭐</span>
                        <span className="text-sm font-medium">{agent.satisfaction}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200">System Health</CardTitle>
              <CardDescription>Overall performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Response Rate</span>
                  <span>94%</span>
                </div>
                <Progress value={94} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Customer Satisfaction</span>
                  <span>4.7/5</span>
                </div>
                <Progress value={94} className="h-2" />
                <p className="text-xs text-green-700 dark:text-green-300">All systems operating normally</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
