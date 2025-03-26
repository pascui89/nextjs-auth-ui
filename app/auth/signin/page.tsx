import { SignInForm } from "@/components/auth/sign-in-form"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="text-muted-foreground mt-2">Enter your credentials to access your account</p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}

