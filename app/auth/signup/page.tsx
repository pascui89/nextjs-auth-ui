import { SignUpForm } from "@/components/auth/sign-up-form"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground mt-2">Enter your details to create a new account</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}

