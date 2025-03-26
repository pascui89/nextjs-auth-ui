import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// This would typically come from an API or database
async function getRevenueData() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4000 },
    { month: "May", revenue: 7000 },
    { month: "Jun", revenue: 6000 },
    { month: "Jul", revenue: 8000 },
    { month: "Aug", revenue: 9000 },
    { month: "Sep", revenue: 8500 },
    { month: "Oct", revenue: 10000 },
    { month: "Nov", revenue: 11000 },
    { month: "Dec", revenue: 12000 },
  ]
}

export async function RevenueChart() {
  const data = await getRevenueData()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue for the current year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer data={data} valueFormatter={(value) => `$${value.toLocaleString()}`}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <ChartTooltip
                  content={<ChartTooltipContent valueFormatter={(value) => `$${value.toLocaleString()}`} />}
                />
              </AreaChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

