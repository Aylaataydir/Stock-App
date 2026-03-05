import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import loginImg from "../assets/login-img-1.jpg"
import { Link } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { signInShema } from "../lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import useAuthCall from "../hooks/useAuthCall"


export function SignInForm({ className, ...props }) {

  const { signIn } = useAuthCall()

  const form = useForm({
    resolver: zodResolver(signInShema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (credentials) => {
    
    await signIn(credentials)
    console.log(credentials)

  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Sign in to your Smart Stock System account
                </p>
              </div>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Name</FieldLabel>
                    <Input {...field} id="username" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link href="#" className="ml-auto opacity-70 text-sm underline-offset-2 hover:underline hover:opacity-100">
                        Forgot your password?
                      </Link>
                    </div>
                    <Input {...field} type="password" id="password" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Field>
                <Button className="cursor-pointer" disabled={isSubmitting} type="submit">{isSubmitting ? "Signing in..." : "Sign In"}</Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src={loginImg}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div >
  );
}



