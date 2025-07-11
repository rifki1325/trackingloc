'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function Page() {
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    if (!id || typeof id !== 'string') return

    const track = () => {
      if (!navigator.geolocation) {
        console.error('Geolocation not supported')
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const latitude = pos.coords.latitude
          const longitude = pos.coords.longitude

          try {
            const res = await fetch('/api/track', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id, latitude, longitude }),
            })

            const data = await res.json()
            if (data?.destination) {
              router.push(data.destination)
            } else {
              console.warn('No destination found')
            }
          } catch (err) {
            console.error('Tracking failed:', err)
          }
        },
        (err) => console.error('Location error', err)
      )
    }

    track()
  }, [id, router])

  return (
    <main className="flex items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-xl font-semibold animate-pulse">
        Mendapatkan lokasi dan mengalihkan...
      </h1>
    </main>
  )
}
