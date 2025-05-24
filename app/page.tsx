"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminDashboard } from "@/components/admin-dashboard"
import { TicketManagement } from "@/components/ticket-management"
import { Analytics } from "@/components/analytics"
import { CustomerManagement } from "@/components/customer-management"
import { AgentManagement } from "@/components/agent-management"

export default function AdminPortal() {
  const [activeView, setActiveView] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <AdminDashboard />
      case "tickets":
        return <TicketManagement />
      case "analytics":
        return <Analytics />
      case "customers":
        return <CustomerManagement />
      case "agents":
        return <AgentManagement />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <AdminHeader setSidebarOpen={setSidebarOpen} />

      <div className="flex h-[calc(100vh-4rem)]">
        <AdminSidebar
          activeView={activeView}
          setActiveView={setActiveView}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <main className="flex-1 transition-all duration-300 ease-in-out">
          <div className="h-full p-6 overflow-y-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
