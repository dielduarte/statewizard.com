"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [error, setError] = useState({
    email: "",
    firstName: ""
  })

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;

    if (!firstName) {
      setError({
        email: "",
        firstName: "Please enter a valid first name"
      })
      return
    }

    if (!validateEmail(email)) {
      setError({
        email: "Please enter a valid email address",
        firstName: ""
      })
      return
    }

    setError({
      email: "",
      firstName: ""
    })
    // Handle successful submission
    console.log("Email submitted:", email, firstName)
    // send a post call to api/send
    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({ email, firstName })
    })
  }

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

        <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your name"
              name="firstName"
              className="h-12 bg-gray-800/50 text-white placeholder:text-gray-400"
            />
            {error.firstName && <p className="mt-2 text-left text-sm text-red-400">{error.firstName}</p>}
          </div>
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="h-12 bg-gray-800/50 text-white placeholder:text-gray-400"
            />
            {error.email && <p className="mt-2 text-left text-sm text-red-400">{error.email}</p>}
          </div>
          <Button
            type="submit"
            className="h-12 w-full bg-gradient-to-r from-[#E9B98E] to-[#E9A1A1] text-black hover:opacity-90"
          >
            Sign me up
          </Button>
        </form>

        <div className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900">
          <div className="px-8 py-20 text-center">
            <h2 className="text-4xl font-bold text-white md:text-5xl">Ready to Transform Your Workflow?</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

