import { Suspense } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { AppearanceSettings } from "@/components/settings/appearance-settings"

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 pt-4">
          <Suspense fallback={<SettingsCardSkeleton />}>
            <ProfileSettings />
          </Suspense>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 pt-4">
          <Suspense fallback={<SettingsCardSkeleton />}>
            <SecuritySettings />
          </Suspense>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 pt-4">
          <Suspense fallback={<SettingsCardSkeleton />}>
            <AppearanceSettings />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SettingsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-60" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-1/2" />
      </CardContent>
    </Card>
  )
}

