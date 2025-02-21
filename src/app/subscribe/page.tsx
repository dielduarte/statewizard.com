"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
function Subscribe() {
  const searchParams = useSearchParams()
 
  const id = searchParams.get('id')

  useEffect(() => {
    if(id) {
      fetch('/api/confirm', {
        method: 'POST',
        body: JSON.stringify({ id }),
      })
    }
  }, [id])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-8 text-center">
        <Image src="/logo.png" className="mx-auto w-80" width={500} height={500} alt="state wizard logo" />
        <p className="mb-4 text-lg">
         Obrigado por se inscrever e apoiar essa ideia! Em breve, você receberá o primeiro e-mail.
        </p>
      </div>
    </div>
  )
}
export default function SubscribePage() {
  return (
    <Suspense>
      <Subscribe />
    </Suspense>
  )
}

