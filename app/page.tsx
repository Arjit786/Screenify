"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Github } from "lucide-react"
import Link from "next/link"

export default function AuthenticationPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-blue-700" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg width="96" height="46" viewBox="0 0 48 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <rect x="23" width="25" height="23" rx="2" fill="#FFFFFF" />
            <path d="M2.016 14.112H4.944V15H0.924V6.636H2.016V14.112ZM6.66769 7.356C6.45969 7.356 6.28369 7.284 6.13969 7.14C5.99569 6.996 5.92369 6.82 5.92369 6.612C5.92369 6.404 5.99569 6.228 6.13969 6.084C6.28369 5.94 6.45969 5.868 6.66769 5.868C6.86769 5.868 7.03569 5.94 7.17169 6.084C7.31569 6.228 7.38769 6.404 7.38769 6.612C7.38769 6.82 7.31569 6.996 7.17169 7.14C7.03569 7.284 6.86769 7.356 6.66769 7.356ZM7.19569 8.424V15H6.10369V8.424H7.19569ZM12.2608 8.304C13.0608 8.304 13.7088 8.548 14.2048 9.036C14.7008 9.516 14.9488 10.212 14.9488 11.124V15H13.8688V11.28C13.8688 10.624 13.7048 10.124 13.3768 9.78C13.0488 9.428 12.6008 9.252 12.0328 9.252C11.4568 9.252 10.9968 9.432 10.6528 9.792C10.3168 10.152 10.1488 10.676 10.1488 11.364V15H9.05681V8.424H10.1488V9.36C10.3648 9.024 10.6568 8.764 11.0248 8.58C11.4008 8.396 11.8128 8.304 12.2608 8.304ZM20.4046 15L17.8246 12.096V15H16.7326V6.12H17.8246V11.34L20.3566 8.424H21.8806L18.7846 11.7L21.8926 15H20.4046Z" fill="white" />
            <path d="M30.8633 9.24C30.7113 8.96 30.4913 8.748 30.2033 8.604C29.9233 8.452 29.5913 8.376 29.2073 8.376C28.5433 8.376 28.0113 8.596 27.6113 9.036C27.2113 9.468 27.0113 10.048 27.0113 10.776C27.0113 11.552 27.2193 12.16 27.6353 12.6C28.0593 13.032 28.6393 13.248 29.3753 13.248C29.8793 13.248 30.3033 13.12 30.6473 12.864C30.9993 12.608 31.2553 12.24 31.4153 11.76H28.8113V10.248H33.2753V12.156C33.1233 12.668 32.8633 13.144 32.4953 13.584C32.1353 14.024 31.6753 14.38 31.1153 14.652C30.5553 14.924 29.9233 15.06 29.2193 15.06C28.3873 15.06 27.6433 14.88 26.9873 14.52C26.3393 14.152 25.8313 13.644 25.4633 12.996C25.1033 12.348 24.9233 11.608 24.9233 10.776C24.9233 9.944 25.1033 9.204 25.4633 8.556C25.8313 7.9 26.3393 7.392 26.9873 7.032C27.6353 6.664 28.3753 6.48 29.2073 6.48C30.2153 6.48 31.0633 6.724 31.7513 7.212C32.4473 7.7 32.9073 8.376 33.1313 9.24H30.8633ZM36.464 9.42C36.704 9.052 37.004 8.764 37.364 8.556C37.724 8.34 38.124 8.232 38.564 8.232V10.404H38C37.488 10.404 37.104 10.516 36.848 10.74C36.592 10.956 36.464 11.34 36.464 11.892V15H34.412V8.304H36.464V9.42ZM42.5928 15.096C41.9368 15.096 41.3448 14.956 40.8168 14.676C40.2968 14.396 39.8848 13.996 39.5808 13.476C39.2848 12.956 39.1368 12.348 39.1368 11.652C39.1368 10.964 39.2888 10.36 39.5928 9.84C39.8968 9.312 40.3128 8.908 40.8408 8.628C41.3688 8.348 41.9608 8.208 42.6168 8.208C43.2728 8.208 43.8648 8.348 44.3928 8.628C44.9208 8.908 45.3368 9.312 45.6408 9.84C45.9448 10.36 46.0968 10.964 46.0968 11.652C46.0968 12.34 45.9408 12.948 45.6288 13.476C45.3248 13.996 44.9048 14.396 44.3688 14.676C43.8408 14.956 43.2488 15.096 42.5928 15.096ZM42.5928 13.32C42.9848 13.32 43.3168 13.176 43.5888 12.888C43.8688 12.6 44.0088 12.188 44.0088 11.652C44.0088 11.116 43.8728 10.704 43.6008 10.416C43.3368 10.128 43.0088 9.984 42.6168 9.984C42.2168 9.984 41.8848 10.128 41.6208 10.416C41.3568 10.696 41.2248 11.108 41.2248 11.652C41.2248 12.188 41.3528 12.6 41.6088 12.888C41.8728 13.176 42.2008 13.32 42.5928 13.32Z" fill="black" />
          </svg>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Create, schedule, and post powerful LinkedIn content in minutes. LinkedGro AI-powered modules help you drive engagement, boost productivity and stay consistent. &rdquo;
            </p>
            <footer className="text-sm"></footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={onSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button disabled={isLoading}>
                  {isLoading && (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  )}
                  <Link href="/dashboard/onboarding">
                    Sign In with Email
                  </Link>
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}