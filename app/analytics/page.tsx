import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { UserActivityChart } from "@/components/dashboard/user-activity-chart"

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              <Suspense fallback={<AnalyticsCardSkeleton />}>
                <RevenueChart />
              </Suspense>
            </div>
            <div className="col-span-3">
              <Suspense fallback={<AnalyticsCardSkeleton />}>
                <UserActivityChart />
              </Suspense>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Detailed revenue metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                <RevenueChart />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Metrics</CardTitle>
              <CardDescription>User activity and engagement analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                <UserActivityChart />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AnalyticsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-60" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  )
}

