"use client"

import { useActionState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
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
          firstName: "Por favor, insira um nome válido"
        }
      }

      if (!validateEmail(email)) {
        return {
          email: "Por favor, insira um e-mail válido",
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
          apiMessage: "Desculpe! Não conseguimos te inscrever no momento.",
          apiError: true
        }
      }

      return {
        email: "",
        firstName: "",
        apiMessage: "Obrigado! Por favor, confirme seu e-mail clicando no link de confirmação. :)",
        apiError: false
      };
    },
    null,
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-8 text-center">
        <Image src="/logo.png" className="mx-auto w-80" width={500} height={500} alt="state wizard logo" />
        <p className="mb-4 text-lg text-gray-400">
         Cansado de lidar com estados complexos do jeito tradicional? As state machines vão mudar o jogo, trazendo mais clareza, previsibilidade e estabilidade para suas aplicações!
        </p>
        <p className="mb-12 text-lg text-gray-400">
          O State Wizard é um curso gratuito por e-mail, projetado para te ensinar, de forma prática e eficiente, como lidar com estados complexos de forma simples e eficiente. 🚀<br />Não enviaremos spam.
        </p>

      {error?.apiMessage 
        ? <p className={`mt-2 mx-auto text-center text-sm ${error?.apiError ? 'text-red-400' : 'text-emerald-400'}`}>{error.apiMessage}</p>
        : (
            <form action={submitAction} className="mx-auto max-w-md space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Nome"
                  name="firstName"
                  className="h-12 bg-gray-800/50 text-white placeholder:text-gray-400"
                />
                {error?.firstName && <p className="mt-2 text-left text-sm text-red-400">{error.firstName}</p>}
              </div>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="E-mail"
                  name="email"
                  className="h-12 bg-gray-800/50 text-white placeholder:text-gray-400"
                />
                {error?.email && <p className="mt-2 text-left text-sm text-red-400">{error.email}</p>}
              </div>
              <Button
                type="submit"
                className="h-12 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-90"
                disabled={isPending}
              >
                {isPending ? "Salvando..." : "Quero receber o curso via email"}
              </Button>
            </form>
          )}
      </div>
    </div>
  )
}

