import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { UserActivityChart } from "@/components/dashboard/user-activity-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { Suspense } from "react"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader user={session.user} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<DashboardSkeleton type="stats" />}>
          <DashboardStats />
        </Suspense>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <Suspense fallback={<DashboardSkeleton type="chart" />}>
            <RevenueChart />
          </Suspense>
        </div>
        <div className="col-span-3">
          <Suspense fallback={<DashboardSkeleton type="chart" />}>
            <UserActivityChart />
          </Suspense>
        </div>
      </div>

      <div className="grid gap-4">
        <Suspense fallback={<DashboardSkeleton type="table" />}>
          <RecentTransactions />
        </Suspense>
      </div>
    </div>
  )
}

