"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Filter,
  MessageCircle,
  User,
  Send,
  Eye,
  UserCheck,
  Tag,
  Calendar,
  Bot,
  Lightbulb,
  Copy,
} from "lucide-react"

export function TicketManagement() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [response, setResponse] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { toast } = useToast()

  const tickets = [
    {
      id: "#TKT-001",
      customer: "John Doe",
      email: "john.doe@email.com",
      subject: "Refund request for order #ORD-12345",
      status: "Open",
      priority: "High",
      category: "Refunds",
      agent: "Unassigned",
      created: "2024-01-20 10:30 AM",
      lastUpdate: "2024-01-20 10:30 AM",
      messages: [
        {
          id: 1,
          sender: "customer",
          content:
            "Hi, I would like to request a refund for my recent order #ORD-12345. The product arrived damaged and doesn't match the description. I have photos as proof.",
          timestamp: "2024-01-20 10:30 AM",
          senderName: "John Doe",
        },
      ],
      customerInfo: {
        totalOrders: 5,
        memberSince: "2023-06-15",
        loyaltyTier: "Gold",
      },
    },
    {
      id: "#TKT-002",
      customer: "Jane Smith",
      email: "jane.smith@email.com",
      subject: "Product not working as expected",
      status: "In Progress",
      priority: "Medium",
      category: "Product Issues",
      agent: "Sarah Johnson",
      created: "2024-01-20 08:15 AM",
      lastUpdate: "2024-01-20 11:45 AM",
      messages: [
        {
          id: 1,
          sender: "customer",
          content:
            "The wireless headphones I ordered are not connecting to my device properly. I've tried all the troubleshooting steps in the manual.",
          timestamp: "2024-01-20 08:15 AM",
          senderName: "Jane Smith",
        },
        {
          id: 2,
          sender: "agent",
          content:
            "Hi Jane, I'm sorry to hear about the connection issues. Let me help you troubleshoot this. Can you please tell me what device you're trying to connect to?",
          timestamp: "2024-01-20 11:45 AM",
          senderName: "Sarah Johnson",
        },
        {
          id: 3,
          sender: "customer",
          content:
            "I'm trying to connect to my iPhone 14. The headphones appear in Bluetooth settings but won't stay connected.",
          timestamp: "2024-01-20 12:15 PM",
          senderName: "Jane Smith",
        },
      ],
      customerInfo: {
        totalOrders: 12,
        memberSince: "2022-03-10",
        loyaltyTier: "Platinum",
      },
    },
    {
      id: "#TKT-003",
      customer: "Bob Wilson",
      email: "bob.wilson@email.com",
      subject: "Billing inquiry about subscription",
      status: "Pending",
      priority: "Low",
      category: "Billing",
      agent: "Mike Chen",
      created: "2024-01-19 03:20 PM",
      lastUpdate: "2024-01-19 03:20 PM",
      messages: [
        {
          id: 1,
          sender: "customer",
          content:
            "I was charged twice for my monthly subscription. Can you please check my billing history and refund the duplicate charge?",
          timestamp: "2024-01-19 03:20 PM",
          senderName: "Bob Wilson",
        },
      ],
      customerInfo: {
        totalOrders: 8,
        memberSince: "2023-01-20",
        loyaltyTier: "Silver",
      },
    },
  ]

  const aiSuggestions = [
    {
      type: "empathy",
      text: "I understand your frustration with this issue. Let me help you resolve this quickly.",
      category: "Opening",
    },
    {
      type: "solution",
      text: "I've reviewed your order and can process a full refund immediately. The refund will appear in your account within 3-5 business days.",
      category: "Refund Solution",
    },
    {
      type: "followup",
      text: "Is there anything else I can help you with today? I want to make sure you're completely satisfied with our service.",
      category: "Closing",
    },
    {
      type: "technical",
      text: "Let's try resetting the Bluetooth connection. Please go to Settings > Bluetooth, forget the device, then restart both your phone and headphones before reconnecting.",
      category: "Technical Support",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
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

  const handleSendResponse = () => {
    if (!response.trim() || !selectedTicket) return

    // Add the response to the conversation
    const newMessage = {
      id: selectedTicket.messages.length + 1,
      sender: "agent",
      content: response,
      timestamp: new Date().toLocaleString(),
      senderName: "Admin User",
    }

    // Update the selected ticket with the new message
    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessage],
      lastUpdate: new Date().toLocaleString(),
      status: "In Progress",
    }

    setSelectedTicket(updatedTicket)

    toast({
      title: "Response Sent",
      description: "Your response has been sent to the customer.",
    })
    setResponse("")
    setShowSuggestions(false)
  }

  const handleUseSuggestion = (suggestion: string) => {
    setResponse(suggestion)
    setShowSuggestions(false)
  }

  const handleAssignTicket = (ticketId: string, agent: string) => {
    toast({
      title: "Ticket Assigned",
      description: `Ticket ${ticketId} has been assigned to ${agent}.`,
    })
  }

  const handleStatusChange = (ticketId: string, status: string) => {
    toast({
      title: "Status Updated",
      description: `Ticket ${ticketId} status changed to ${status}.`,
    })
  }

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Ticket Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and respond to customer support tickets</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
            <MessageCircle className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl border-0 shadow-sm bg-white/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search tickets..." className="pl-10 rounded-xl border-gray-200" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-40 rounded-xl border-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-40 rounded-xl border-gray-200">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-40 rounded-xl border-gray-200">
                <SelectValue placeholder="Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="mike">Mike Chen</SelectItem>
                <SelectItem value="emily">Emily Davis</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl border-0 shadow-sm bg-white/80 backdrop-blur-sm h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Support Tickets</CardTitle>
              <CardDescription>Click on a ticket to view details and respond</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                {tickets.map((ticket, index) => (
                  <div
                    key={index}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-all duration-200 ${
                      selectedTicket?.id === ticket.id
                        ? "bg-blue-50/80 dark:bg-blue-900/20 border-l-4 border-l-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm line-clamp-1">{ticket.subject}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {ticket.id} • {ticket.customer}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge className={`${getStatusColor(ticket.status)} text-xs px-2 py-1`}>{ticket.status}</Badge>
                        <Badge className={`${getPriorityColor(ticket.priority)} text-xs px-2 py-1`}>
                          {ticket.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {ticket.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <UserCheck className="w-3 h-3" />
                          {ticket.agent}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {ticket.created.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ticket Details */}
        <div className="lg:col-span-3">
          {selectedTicket ? (
            <div className="space-y-6">
              {/* Ticket Header */}
              <Card className="rounded-2xl border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedTicket.subject}</CardTitle>
                      <CardDescription className="mt-1">
                        {selectedTicket.id} • {selectedTicket.customer} • {selectedTicket.email}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      <Eye className="w-4 h-4 mr-2" />
                      View Order
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <Select defaultValue={selectedTicket.status.toLowerCase().replace(" ", "-")}>
                        <SelectTrigger className="rounded-xl mt-1 border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Assign Agent</label>
                      <Select defaultValue={selectedTicket.agent.toLowerCase().replace(" ", "-")}>
                        <SelectTrigger className="rounded-xl mt-1 border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                          <SelectItem value="mike-chen">Mike Chen</SelectItem>
                          <SelectItem value="emily-davis">Emily Davis</SelectItem>
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Badge className={`${getPriorityColor(selectedTicket.priority)} px-3 py-1`}>
                      {selectedTicket.priority} Priority
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      {selectedTicket.category}
                    </Badge>
                    <span className="text-gray-600 dark:text-gray-400">Created: {selectedTicket.created}</span>
                  </div>

                  {/* Customer Quick Info */}
                  <div className="p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{selectedTicket.customer}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {selectedTicket.customerInfo.loyaltyTier} • {selectedTicket.customerInfo.totalOrders} orders
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conversation */}
              <Card className="rounded-2xl border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Conversation</CardTitle>
                  <CardDescription>Customer messages and agent responses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Messages */}
                  <div className="max-h-80 overflow-y-auto space-y-4 p-4 bg-gray-50/30 rounded-xl">
                    {selectedTicket.messages.map((message: any) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === "agent" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender === "customer" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}

                        <div className={`max-w-[75%] ${message.sender === "agent" ? "order-2" : ""}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-gray-600">{message.senderName}</span>
                            <span className="text-xs text-gray-400">{message.timestamp}</span>
                          </div>
                          <div
                            className={`rounded-2xl p-3 shadow-sm ${
                              message.sender === "agent"
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                : "bg-white border border-gray-200"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                        </div>

                        {message.sender === "agent" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 order-3">
                            <UserCheck className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* AI Suggestions */}
                  {showSuggestions && (
                    <Card className="rounded-xl border border-blue-200 bg-blue-50/50">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <Bot className="w-5 h-5 text-blue-600" />
                          <CardTitle className="text-sm text-blue-800">AI Response Suggestions</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {aiSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-3 rounded-lg bg-white/80 border border-blue-100 hover:border-blue-300 cursor-pointer transition-colors"
                            onClick={() => handleUseSuggestion(suggestion.text)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-blue-700">{suggestion.category}</span>
                              <Copy className="w-3 h-3 text-blue-500" />
                            </div>
                            <p className="text-sm text-gray-700">{suggestion.text}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* Response Form */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">Your Response</label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSuggestions(!showSuggestions)}
                        className="rounded-lg"
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        AI Suggestions
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Type your response to the customer..."
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      className="rounded-xl min-h-24 border-gray-200 resize-none"
                    />
                    <div className="flex gap-3">
                      <Button
                        onClick={handleSendResponse}
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex-1"
                        disabled={!response.trim()}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Response
                      </Button>
                      <Button variant="outline" className="rounded-xl">
                        Save Draft
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="rounded-2xl border-0 shadow-sm bg-white/80 backdrop-blur-sm h-full">
              <CardContent className="flex items-center justify-center h-full p-12">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Select a Ticket</h3>
                  <p className="text-gray-600 max-w-sm">
                    Choose a ticket from the list to view details and respond to the customer.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
