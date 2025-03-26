import type React from "react"
import { AppShell } from "@/components/ui-kit/app-shell"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function DataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  return <AppShell>{children}</AppShell>
}

