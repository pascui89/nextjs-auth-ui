import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Users, CreditCard, DollarSign, Activity } from "lucide-react"

// This would typically come from an API or database
async function getStats() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    totalRevenue: "$45,231.89",
    revenueIncrease: "+20.1%",
    newCustomers: "2,350",
    customerIncrease: "+18.2%",
    transactions: "12,234",
    transactionIncrease: "+14.5%",
    activeUsers: "573",
    userIncrease: "+32.1%",
  }
}

export async function DashboardStats() {
  const stats = await getStats()

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRevenue}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="text-green-500 flex items-center mr-1">
              {stats.revenueIncrease} <ArrowUpRight className="h-3 w-3 ml-1" />
            </span>
            from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.newCustomers}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="text-green-500 flex items-center mr-1">
              {stats.customerIncrease} <ArrowUpRight className="h-3 w-3 ml-1" />
            </span>
            from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Transactions</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.transactions}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="text-green-500 flex items-center mr-1">
              {stats.transactionIncrease} <ArrowUpRight className="h-3 w-3 ml-1" />
            </span>
            from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeUsers}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="text-green-500 flex items-center mr-1">
              {stats.userIncrease} <ArrowUpRight className="h-3 w-3 ml-1" />
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
    </>
  )
}

