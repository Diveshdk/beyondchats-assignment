"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  Clock,
  MessageCircle,
  Star,
  TrendingUp,
  Plus,
  Edit,
} from "lucide-react"

export function AgentManagement() {
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const { toast } = useToast()

  const agents = [
    {
      id: "AGT-001",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 123-4567",
      role: "Senior Support Agent",
      department: "Customer Support",
      joinDate: "2023-01-15",
      status: "Active",
      isOnline: true,
      totalTickets: 156,
      resolvedTickets: 148,
      avgResponseTime: "1.8h",
      satisfaction: 4.9,
      currentWorkload: 8,
      maxWorkload: 15,
      specialties: ["Refunds", "Technical Issues"],
      recentActivity: [
        { action: "Resolved ticket #TKT-123", time: "2 hours ago" },
        { action: "Assigned to ticket #TKT-124", time: "4 hours ago" },
        { action: "Updated ticket #TKT-125", time: "6 hours ago" },
      ],
      performance: {
        thisWeek: { tickets: 23, resolved: 21, avgTime: "1.6h" },
        lastWeek: { tickets: 19, resolved: 18, avgTime: "2.1h" },
      },
    },
    {
      id: "AGT-002",
      name: "Mike Chen",
      email: "mike.chen@company.com",
      phone: "+1 (555) 987-6543",
      role: "Support Agent",
      department: "Customer Support",
      joinDate: "2023-03-20",
      status: "Active",
      isOnline: true,
      totalTickets: 124,
      resolvedTickets: 115,
      avgResponseTime: "2.1h",
      satisfaction: 4.7,
      currentWorkload: 12,
      maxWorkload: 15,
      specialties: ["Billing", "Account Issues"],
      recentActivity: [
        { action: "Resolved ticket #TKT-126", time: "1 hour ago" },
        { action: "Started working on #TKT-127", time: "3 hours ago" },
        { action: "Closed ticket #TKT-128", time: "5 hours ago" },
      ],
      performance: {
        thisWeek: { tickets: 18, resolved: 16, avgTime: "2.0h" },
        lastWeek: { tickets: 22, resolved: 20, avgTime: "2.3h" },
      },
    },
    {
      id: "AGT-003",
      name: "Emily Davis",
      email: "emily.davis@company.com",
      phone: "+1 (555) 456-7890",
      role: "Lead Support Agent",
      department: "Customer Support",
      joinDate: "2022-08-10",
      status: "Active",
      isOnline: false,
      totalTickets: 203,
      resolvedTickets: 195,
      avgResponseTime: "1.5h",
      satisfaction: 4.8,
      currentWorkload: 5,
      maxWorkload: 20,
      specialties: ["Product Issues", "Returns", "VIP Customers"],
      recentActivity: [
        { action: "Escalated ticket #TKT-129", time: "8 hours ago" },
        { action: "Resolved ticket #TKT-130", time: "10 hours ago" },
        { action: "Updated customer profile", time: "12 hours ago" },
      ],
      performance: {
        thisWeek: { tickets: 25, resolved: 24, avgTime: "1.4h" },
        lastWeek: { tickets: 28, resolved: 27, avgTime: "1.6h" },
      },
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
      case "On Leave":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
    }
  }

  const getWorkloadColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 80) return "text-red-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-green-600"
  }

  const handleStatusToggle = (agentId: string, newStatus: boolean) => {
    toast({
      title: "Status Updated",
      description: `Agent status has been ${newStatus ? "activated" : "deactivated"}.`,
    })
  }

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Agent Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage support team members and their performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-2xl">
            <TrendingUp className="w-4 h-4 mr-2" />
            Performance Report
          </Button>
          <Button className="rounded-2xl">
            <Plus className="w-4 h-4 mr-2" />
            Add Agent
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-3xl border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Agents</p>
                <p className="text-2xl font-bold mt-1">12</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Online Now</p>
                <p className="text-2xl font-bold mt-1">8</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response</p>
                <p className="text-2xl font-bold mt-1">2.1h</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Team Satisfaction</p>
                <p className="text-2xl font-bold mt-1">4.8</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="rounded-3xl border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search agents..." className="pl-10 rounded-2xl" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48 rounded-2xl">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="support">Customer Support</SelectItem>
                <SelectItem value="technical">Technical Support</SelectItem>
                <SelectItem value="billing">Billing Support</SelectItem>
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
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agents List */}
        <Card className="rounded-3xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Support Agents</CardTitle>
            <CardDescription>Click on an agent to view detailed information</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[600px] overflow-y-auto">
              {agents.map((agent, index) => (
                <div
                  key={index}
                  className={`p-6 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors ${
                    selectedAgent?.id === agent.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                  onClick={() => setSelectedAgent(agent)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <UserCheck className="w-5 h-5 text-white" />
                        </div>
                        {agent.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{agent.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{agent.role}</p>
                        <p className="text-xs text-gray-500">{agent.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge className={`${getStatusColor(agent.status)} text-xs`}>{agent.status}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{agent.satisfaction}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                    <div>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {agent.resolvedTickets}/{agent.totalTickets} resolved
                      </span>
                    </div>
                    <div>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {agent.avgResponseTime} avg
                      </span>
                    </div>
                    <div>
                      <span className={`font-medium ${getWorkloadColor(agent.currentWorkload, agent.maxWorkload)}`}>
                        Workload: {agent.currentWorkload}/{agent.maxWorkload}
                      </span>
                    </div>
                    <div>
                      <span>Specialties: {agent.specialties.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agent Details */}
        {selectedAgent ? (
          <div className="space-y-6">
            {/* Agent Info */}
            <Card className="rounded-3xl border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-white" />
                      </div>
                      {selectedAgent.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{selectedAgent.name}</CardTitle>
                      <CardDescription>{selectedAgent.role}</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-2xl">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedAgent.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedAgent.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Joined {selectedAgent.joinDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm font-medium">Active Status</span>
                  <Switch
                    checked={selectedAgent.status === "Active"}
                    onCheckedChange={(checked) => handleStatusToggle(selectedAgent.id, checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="rounded-3xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/50">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Tickets</p>
                    <p className="text-xl font-bold">{selectedAgent.totalTickets}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/50">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Resolution Rate</p>
                    <p className="text-xl font-bold">
                      {Math.round((selectedAgent.resolvedTickets / selectedAgent.totalTickets) * 100)}%
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/50">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response</p>
                    <p className="text-xl font-bold">{selectedAgent.avgResponseTime}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/50">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xl font-bold">{selectedAgent.satisfaction}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.specialties.map((specialty: string, index: number) => (
                      <Badge key={index} variant="secondary" className="rounded-xl">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="rounded-3xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedAgent.recentActivity.map((activity: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/50"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardContent className="flex items-center justify-center h-full p-12">
              <div className="text-center">
                <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select an Agent</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose an agent from the list to view their detailed information and performance metrics.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
