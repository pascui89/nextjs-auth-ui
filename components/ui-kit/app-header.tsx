"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/ui-kit/theme-toggle"
import { ThemeSelector } from "@/components/ui-kit/theme-selector"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"

export function AppHeader() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isLoggedIn = !!session?.user
  const isAuthPage = pathname.startsWith("/auth/")

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            AppName
          </Link>

          {isLoggedIn && (
            <nav className="hidden md:flex gap-6">
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/profile" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Profile
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          <ThemeSelector />
          <ThemeToggle />

          {isLoggedIn ? (
            <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </Button>
          ) : (
            !isAuthPage && (
              <Button asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  )
}

