"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  MessageCircle,
  BarChart3,
  Users,
  UserCheck,
  X,
  Sparkles,
  AlertCircle,
  Clock,
} from "lucide-react"

interface AdminSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const navigation = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    badge: null,
    description: "Overview & metrics",
  },
  {
    id: "tickets",
    name: "Ticket Management",
    icon: MessageCircle,
    badge: "12",
    description: "Manage customer queries",
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: BarChart3,
    badge: null,
    description: "Performance insights",
  },
  {
    id: "customers",
    name: "Customers",
    icon: Users,
    badge: null,
    description: "Customer database",
  },
  {
    id: "agents",
    name: "Agent Management",
    icon: UserCheck,
    badge: "2",
    description: "Manage support team",
  },
]

export function AdminSidebar({ activeView, setActiveView, isOpen, setIsOpen }: AdminSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col bg-white/90 backdrop-blur-md border-r border-gray-200/50 dark:bg-slate-900/90 dark:border-slate-800">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-gray-200 dark:border-slate-800">
            <h2 className="font-semibold">Admin Menu</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Admin Info */}
          <div className="p-4 border-b border-gray-200/50 dark:border-slate-800">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-sm">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">Admin Panel</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Support Management</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="space-y-2 p-4">
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Management
                </h3>
                {navigation.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-auto p-3 rounded-xl transition-all duration-200 mb-2",
                      activeView === item.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm"
                        : "hover:bg-gray-100/80 dark:hover:bg-slate-800",
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
            </nav>
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-t border-gray-200/50 dark:border-slate-800">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span>Urgent Tickets</span>
                </div>
                <Badge variant="destructive" className="text-xs">
                  3
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span>Pending</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  9
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
