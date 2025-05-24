"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Clock, Package, X, Sparkles, HelpCircle, FileText, Search } from "lucide-react"

interface SupportSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const navigation = [
  { id: "chat", name: "Live Support", icon: MessageCircle, badge: null, description: "Chat with our AI assistant" },
  { id: "orders", name: "Order Help", icon: Package, badge: null, description: "Track orders & returns" },
  { id: "tickets", name: "My Tickets", icon: FileText, badge: "2", description: "View support history" },
]

const quickHelp = [
  { title: "Track an Order", description: "Find your order status", icon: Package },
  { title: "Return an Item", description: "Start a return request", icon: Clock },
  { title: "Billing Question", description: "Payment & billing help", icon: HelpCircle },
  { title: "Account Issues", description: "Login & account help", icon: Search },
]

export function SupportSidebar({ activeView, setActiveView, isOpen, setIsOpen }: SupportSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-80 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col bg-white/90 backdrop-blur-md border-r border-gray-200 dark:bg-slate-900/90 dark:border-slate-800">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-gray-200 dark:border-slate-800">
            <h2 className="font-semibold">Support Menu</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Welcome Section */}
          <div className="p-4 border-b border-gray-200 dark:border-slate-800">
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">Welcome back!</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">We're here to help</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="space-y-2 p-4">
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Support Options
                </h3>
                {navigation.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-auto p-3 rounded-2xl transition-all duration-200 mb-2",
                      activeView === item.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "hover:bg-gray-100 dark:hover:bg-slate-800",
                    )}
                    onClick={() => {
                      setActiveView(item.id)
                      setIsOpen(false)
                    }}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs opacity-80">{item.description}</div>
                    </div>
                    {item.badge && (
                      <Badge variant={activeView === item.id ? "secondary" : "default"} className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Quick Help
                </h3>
                <div className="space-y-2">
                  {quickHelp.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start gap-3 h-auto p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                      <item.icon className="h-4 w-4 text-gray-500" />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-slate-800">
            <Card className="rounded-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">Need urgent help?</p>
                    <p className="text-xs text-green-600 dark:text-green-300">Call us: 1-800-SUPPORT</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </aside>
    </>
  )
}
