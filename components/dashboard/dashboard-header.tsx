import { ThemeSelector } from "@/components/ui-kit/theme-selector"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface DashboardHeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.name || "User"}!</p>
      </div>
      <div className="flex items-center gap-2">
        <ThemeSelector />
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>
    </div>
  )
}

