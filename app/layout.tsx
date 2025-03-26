import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AppHeader } from "@/components/ui-kit/app-header"
import { getServerSession } from "next-auth"
import { SessionProvider } from "@/components/session-provider"
import "./globals.css"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next.js Dashboard",
  description: "A modern dashboard built with Next.js, TypeScript, and Tailwind CSS",
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#111" },
  ],
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <AppHeader />
              <div className="flex-1">{children}</div>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}



import './globals.css'