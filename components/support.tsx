"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Send,
  Bot,
  User,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  MessageCircle,
  Clock,
  CheckCircle,
  Plus,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai" | "admin"
  timestamp: Date
  isTyping?: boolean
}

export function Support() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI assistant. I can help you with order tracking, product information, and general support. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [composer, setComposer] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDA2u1HXuuVdaMEio2fpA7wUgXyYT1en4M`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful customer support AI assistant for an e-commerce platform. The user asked: "${userMessage}". Please provide a helpful, friendly response. Keep it concise and professional. If it's about orders, mention that you can help track orders, check status, or provide general information. If it's about products, offer to help with product details, availability, or recommendations.`,
                  },
                ],
              },
            ],
          }),
        },
      )

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()
      return (
        data.candidates[0]?.content?.parts[0]?.text ||
        "I'm sorry, I couldn't process your request right now. Please try again or contact our human support team."
      )
    } catch (error) {
      console.error("Error generating AI response:", error)
      return "I'm experiencing some technical difficulties. Please try again in a moment or contact our human support team for immediate assistance."
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Add typing indicator
    const typingMessage: Message = {
      id: "typing",
      content: "",
      sender: "ai",
      timestamp: new Date(),
      isTyping: true,
    }
    setMessages((prev) => [...prev, typingMessage])

    try {
      const aiResponse = await generateAIResponse(inputMessage)

      // Remove typing indicator and add actual response
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== "typing")
        return [
          ...filtered,
          {
            id: (Date.now() + 1).toString(),
            content: aiResponse,
            sender: "ai",
            timestamp: new Date(),
          },
        ]
      })
    } catch (error) {
      setMessages((prev) => prev.filter((msg) => msg.id !== "typing"))
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addToComposer = (content: string) => {
    setComposer((prev) => prev + (prev ? "\n\n" : "") + content)
    toast({
      title: "Added to composer",
      description: "Message content has been added to your composer.",
    })
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied",
      description: "Message copied to clipboard.",
    })
  }

  const supportTickets = [
    { id: "#SUP-001", subject: "Order delivery delay", status: "Open", priority: "High", date: "2024-01-20" },
    { id: "#SUP-002", subject: "Product return request", status: "Resolved", priority: "Medium", date: "2024-01-18" },
    { id: "#SUP-003", subject: "Payment issue", status: "In Progress", priority: "High", date: "2024-01-15" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">AI Support Center</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get instant help with our AI assistant or create support tickets
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chat Messages */}
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>AI Assistant</CardTitle>
                  <CardDescription>Powered by Gemini AI</CardDescription>
                </div>
                <Badge className="ml-auto bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                  Online
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender !== "user" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : ""}`}>
                      <div
                        className={`rounded-2xl p-4 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        {message.isTyping ? (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        )}
                      </div>

                      {!message.isTyping && message.sender === "ai" && (
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyMessage(message.content)}
                            className="h-8 px-2 text-xs"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addToComposer(message.content)}
                            className="h-8 px-2 text-xs"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add to Composer
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                        </div>
                      )}

                      <p className="text-xs text-gray-500 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                    </div>

                    {message.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0 order-3">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="rounded-2xl"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="rounded-2xl px-6"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message Composer */}
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Message Composer</CardTitle>
              <CardDescription>Compose and refine your support request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Compose your detailed support request here..."
                value={composer}
                onChange={(e) => setComposer(e.target.value)}
                className="min-h-32 rounded-2xl"
              />
              <div className="flex gap-2">
                <Button className="rounded-2xl">
                  <Send className="w-4 h-4 mr-2" />
                  Send to Human Support
                </Button>
                <Button variant="outline" className="rounded-2xl">
                  Save Draft
                </Button>
                <Button variant="outline" onClick={() => setComposer("")} className="rounded-2xl">
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start rounded-2xl" variant="outline">
                <MessageCircle className="w-4 h-4 mr-3" />
                Track Order
              </Button>
              <Button className="w-full justify-start rounded-2xl" variant="outline">
                <Clock className="w-4 h-4 mr-3" />
                Return Request
              </Button>
              <Button className="w-full justify-start rounded-2xl" variant="outline">
                <Sparkles className="w-4 h-4 mr-3" />
                Product Info
              </Button>
              <Button className="w-full justify-start rounded-2xl" variant="outline">
                <CheckCircle className="w-4 h-4 mr-3" />
                Account Help
              </Button>
            </CardContent>
          </Card>

          {/* Support Tickets */}
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>Your support history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {supportTickets.map((ticket, index) => (
                <div key={index} className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{ticket.id}</span>
                    <Badge variant={ticket.status === "Resolved" ? "default" : "secondary"} className="text-xs">
                      {ticket.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{ticket.subject}</p>
                  <p className="text-xs text-gray-500">{ticket.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardHeader>
              <CardTitle className="text-purple-800 dark:text-purple-200">AI Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Instant responses</span>
              </div>
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-600" />
                <span>Order tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-purple-600" />
                <span>24/7 availability</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-600" />
                <span>Smart suggestions</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
