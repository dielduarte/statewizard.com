"use client"

import { useActionState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

   const [error, submitAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const email = formData.get('email') as string;
      const firstName = formData.get('firstName') as string;

      if (!firstName) {
        return {
          email: "",
          firstName: "Please enter a valid first name"
        }
      }

      if (!validateEmail(email)) {
        return {
          email: "Please enter a valid email address",
          firstName: ""
        }
      }
      

      const {error} = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({ email, firstName })
      }).then(res => res.json())

      if (error) {
        return {
          email: "",
          firstName: "",
          apiMessage: "Sorry! we can&apos;t sign you up right now.",
          apiError: true
        }
      }

      return {
        email: "",
        firstName: "",
        apiMessage: "Thank you! you will hear from us soon :)",
        apiError: false
      };
    },
    null,
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
          <span className="bg-gradient-to-r from-[#E9B98E] via-[#E9A1A1] to-[#B784C4] bg-clip-text text-transparent">
            Ai video editing, reimagined.
          </span>
        </h1>
        <p className="mb-12 text-lg text-gray-400">
          Create stunning videos effortlessly—AI-powered editing at your fingertips and voice. Launch your content
          faster and smarter!
        </p>

      {error?.apiMessage 
        ? <p className={`mt-2 mx-auto text-center text-sm ${error?.apiError ? 'text-red-400' : 'text-emerald-400'}`}>{error.apiMessage}</p>
        : (
            <form action={submitAction} className="mx-auto max-w-md space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  name="firstName"
                  className="h-12 bg-gray-800/50 text-white placeholder:text-gray-400"
                />
                {error?.firstName && <p className="mt-2 text-left text-sm text-red-400">{error.firstName}</p>}
              </div>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="h-12 bg-gray-800/50 text-white placeholder:text-gray-400"
                />
                {error?.email && <p className="mt-2 text-left text-sm text-red-400">{error.email}</p>}
              </div>
              <Button
                type="submit"
                className="h-12 w-full bg-gradient-to-r from-[#E9B98E] to-[#E9A1A1] text-black hover:opacity-90"
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Sign me up"}
              </Button>
            </form>
          )}

        <div className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900">
          <div className="px-8 py-20 text-center">
            <h2 className="text-4xl font-bold text-white md:text-5xl">Ready to Transform Your Workflow?</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

