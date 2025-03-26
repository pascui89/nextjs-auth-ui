import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8">Next.js Authentication Demo</h1>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

