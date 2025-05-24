"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, MessageCircle, Clock, CheckCircle, AlertCircle, FileText } from "lucide-react"

export function TicketHistory() {
  const tickets = [
    {
      id: "#SUP-001",
      subject: "Refund request for order #ORD-12345",
      status: "Open",
      priority: "High",
      created: "2024-01-20",
      lastUpdate: "2024-01-21",
      agent: "Sarah Johnson",
      category: "Refunds",
      messages: 3,
    },
    {
      id: "#SUP-002",
      subject: "Product not as described - Smart Watch",
      status: "Resolved",
      priority: "Medium",
      created: "2024-01-18",
      lastUpdate: "2024-01-19",
      agent: "Mike Chen",
      category: "Product Issues",
      messages: 5,
    },
    {
      id: "#SUP-003",
      subject: "Payment failed during checkout",
      status: "In Progress",
      priority: "High",
      created: "2024-01-15",
      lastUpdate: "2024-01-20",
      agent: "Emily Davis",
      category: "Billing",
      messages: 7,
    },
    {
      id: "#SUP-004",
      subject: "Account login issues",
      status: "Closed",
      priority: "Low",
      created: "2024-01-10",
      lastUpdate: "2024-01-12",
      agent: "Alex Rodriguez",
      category: "Account",
      messages: 2,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="w-4 h-4" />
      case "In Progress":
        return <Clock className="w-4 h-4" />
      case "Resolved":
      case "Closed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "Closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <p className="text-gray-600 dark:text-gray-400">View and manage your support requests</p>
      </div>

      {/* Filters */}
      <Card className="rounded-3xl border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search tickets..." className="pl-10 rounded-2xl" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48 rounded-2xl">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tickets</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-48 rounded-2xl">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="refunds">Refunds</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="product">Product Issues</SelectItem>
                <SelectItem value="account">Account</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {tickets.map((ticket, index) => (
          <Card key={index} className="rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Ticket Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{ticket.subject}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">{ticket.id}</span>
                        <span>•</span>
                        <span>Created {ticket.created}</span>
                        <span>•</span>
                        <span>Agent: {ticket.agent}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={`${getStatusColor(ticket.status)} rounded-xl px-3 py-1`}>
                      {getStatusIcon(ticket.status)}
                      <span className="ml-2">{ticket.status}</span>
                    </Badge>
                    <Badge className={`${getPriorityColor(ticket.priority)} rounded-xl px-3 py-1`}>
                      {ticket.priority} Priority
                    </Badge>
                    <Badge variant="outline" className="rounded-xl">
                      {ticket.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{ticket.messages} messages</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Last update: {ticket.lastUpdate}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-2xl">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  {(ticket.status === "Open" || ticket.status === "In Progress") && (
                    <Button className="rounded-2xl">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create New Ticket */}
      <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">Need more help?</h3>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Can't find what you're looking for? Create a new support ticket.
              </p>
            </div>
            <Button className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
              <FileText className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
