import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import loginImg from "../assets/login-img-1.jpg"
import { Link } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { signUpShema } from "../lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import useAuthCall from "../hooks/useAuthCall"


export function SignUpForm({ className, ...props }) {

  const { signUp } = useAuthCall()

  const form = useForm({
    resolver: zodResolver(signUpShema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      confirmPassword: ""
    },
  })


  const { isSubmitting } = form.formState

  const onSubmit = async (credentials) => {

    signUp(credentials)

  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 order-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 order-2">
            <FieldGroup className="gap-4">
              <div className="flex flex-col items-center  text-center">
                <h1 className="text-2xl font-bold">Smart Stock System</h1>
                <p className="text-balance text-muted-foreground">
                  Sign up for a new account
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
              <div className="flex flex-col gap-4 md:flex-row md:gap-3    ">
                <Controller
                  name="firstName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="firstName">Firstname</FieldLabel>
                      <Input {...field} id="firstName" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="lastName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="lastName">Lastname</FieldLabel>
                      <Input {...field} id="lastName" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input {...field} id="email" type="email" aria-invalid={fieldState.invalid} />
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
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                    <Input {...field} id="confirmPassword" type="password" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Field>
                <Button className="cursor-pointer mt-3" disabled={isSubmitting} type="submit">{isSubmitting ? "Signing up..." : "Sign Up"}</Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <Link to="/sign-in">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src={loginImg}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale order-1" />
          </div>
        </CardContent>
      </Card>
    </div >
  );
}



