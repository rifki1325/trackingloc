'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const router = useRouter()

  useEffect(() => {
    const trackLocation = () => {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by your browser')
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude

          try {
            const res = await fetch('/api/track', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: params.id,
                latitude,
                longitude,
              }),
            })

            const data = await res.json()
            if (data?.destination) {
              router.push(data.destination)
            } else {
              console.warn('No destination returned from API')
            }
          } catch (err) {
            console.error('Failed to send tracking data', err)
          }
        },
        (error) => {
          console.error('Failed to get location', error)
        }
      )
    }

    trackLocation()
  }, [params.id, router])

  return (
    <main className="flex items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-xl font-semibold animate-pulse">
        Mendapatkan lokasi dan mengalihkan...
      </h1>
    </main>
  )
}
