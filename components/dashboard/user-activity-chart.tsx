import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// This would typically come from an API or database
async function getUserActivityData() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  return [
    { day: "Mon", active: 120, new: 15 },
    { day: "Tue", active: 132, new: 18 },
    { day: "Wed", active: 145, new: 22 },
    { day: "Thu", active: 155, new: 25 },
    { day: "Fri", active: 165, new: 30 },
    { day: "Sat", active: 180, new: 35 },
    { day: "Sun", active: 190, new: 40 },
  ]
}

export async function UserActivityChart() {
  const data = await getUserActivityData()

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <CardDescription>Daily active and new users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer data={data}>
              <BarChart data={data}>
                <XAxis
                  dataKey="day"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Bar dataKey="active" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Active Users" />
                <Bar dataKey="new" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="New Users" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

