"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Send, Bot, User, Copy, ThumbsUp, ThumbsDown, Sparkles, Plus, FileText, Clock } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai" | "admin"
  timestamp: Date
  isTyping?: boolean
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm Fin, your AI support assistant. I can help you with order tracking, returns, refunds, product questions, and more. What can I help you with today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [composer, setComposer] = useState("")
  const [showComposer, setShowComposer] = useState(false)
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
                    text: `You are Fin, a helpful customer support AI assistant for an e-commerce platform. You should be friendly, professional, and provide detailed helpful responses like a real customer service representative. 

The customer asked: "${userMessage}"

Please provide a helpful response. If they're asking about:
- Refunds: Explain the 60-day policy, need for order ID and proof of purchase, condition requirements
- Order tracking: Ask for order number and provide tracking steps
- Returns: Explain the return process and requirements
- Product issues: Ask for details and offer solutions
- Account issues: Guide them through troubleshooting steps

Keep responses detailed but conversational, like a real support agent would respond.`,
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
        "I'm sorry, I'm having trouble processing your request right now. Let me connect you with a human agent who can better assist you."
      )
    } catch (error) {
      console.error("Error generating AI response:", error)
      return "I'm experiencing some technical difficulties. Please try again in a moment, or I can connect you with a human agent for immediate assistance."
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
    setShowComposer(true)
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

  const sendToHumanSupport = () => {
    if (!composer.trim()) return

    toast({
      title: "Ticket Created",
      description: "Your message has been sent to our human support team. You'll receive a response within 24 hours.",
    })
    setComposer("")
    setShowComposer(false)
  }

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Chat Interface */}
      <Card className="flex-1 rounded-3xl border-0 shadow-lg flex flex-col">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">Fin - AI Support Assistant</CardTitle>
              <CardDescription>Powered by Gemini AI • Typically responds in seconds</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Online
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender !== "user" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : ""}`}>
                  <div
                    className={`rounded-3xl p-4 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-auto"
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
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>

                  {!message.isTyping && message.sender === "ai" && (
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyMessage(message.content)}
                        className="h-8 px-3 text-xs rounded-xl"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToComposer(message.content)}
                        className="h-8 px-3 text-xs rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add to composer
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 rounded-xl">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 rounded-xl">
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-2">{message.timestamp.toLocaleTimeString()}</p>
                </div>

                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0 order-3 mt-1">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
            <div className="flex gap-3">
              <Input
                placeholder="Type your message here..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                className="rounded-2xl border-gray-200 dark:border-slate-700"
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
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <Sparkles className="w-3 h-3" />
              <span>Powered by AI • Press Enter to send</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Composer */}
      {showComposer && (
        <Card className="rounded-3xl border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg">Message Composer</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowComposer(false)}>
                ×
              </Button>
            </div>
            <CardDescription>Review and edit your message before sending to human support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Your message to human support..."
              value={composer}
              onChange={(e) => setComposer(e.target.value)}
              className="min-h-32 rounded-2xl"
            />
            <div className="flex gap-2">
              <Button onClick={sendToHumanSupport} className="rounded-2xl">
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
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Human agents typically respond within 24 hours</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
