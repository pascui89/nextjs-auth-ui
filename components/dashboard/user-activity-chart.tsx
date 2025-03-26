"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Mock data - in a real app, this would come from an API
const data = [
  { day: "Mon", active: 120, new: 15 },
  { day: "Tue", active: 132, new: 18 },
  { day: "Wed", active: 145, new: 22 },
  { day: "Thu", active: 155, new: 25 },
  { day: "Fri", active: 165, new: 30 },
  { day: "Sat", active: 180, new: 35 },
  { day: "Sun", active: 190, new: 40 },
]

export function UserActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <CardDescription>Daily active and new users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="active" name="Active Users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="new" name="New Users" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

