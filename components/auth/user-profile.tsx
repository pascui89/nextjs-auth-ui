"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserProfileProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function UserProfile({ user }: UserProfileProps) {
  const { data: session } = useSession()
  const currentUser = session?.user || user

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Name</p>
          <p className="font-medium">{currentUser.name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Email</p>
          <p className="font-medium">{currentUser.email}</p>
        </div>
        <Button variant="destructive" className="w-full mt-4" onClick={() => signOut({ callbackUrl: "/" })}>
          Sign Out
        </Button>
      </CardContent>
    </Card>
  )
}

