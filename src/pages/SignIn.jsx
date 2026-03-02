import { SignInForm } from "@/components/SignInForm"

function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignInForm />
      </div>
    </div>
  )
}

export default SignIn