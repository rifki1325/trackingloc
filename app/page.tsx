'use client'

import { useState } from 'react'

export default function Home() {
  const [trackingLink, setTrackingLink] = useState('')
  const [visible, setVisible] = useState(false)

  async function generateLink() {
    const destination = (document.getElementById('destination') as HTMLInputElement).value
    const collectLocation = (document.getElementById('collectLocation') as HTMLInputElement).checked

    // Kirim ke API create-link
    const res = await fetch('/api/create-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination })
    })

    const data = await res.json()
    setTrackingLink(data.trackingLink)
    setVisible(true)

    // Kirim lokasi langsung juga (opsional)
    if (collectLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            link: destination
          })
        })
      })
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-6">🎯 Link Tracker Generator</h1>

      <div className="w-full max-w-md bg-white shadow p-6 rounded-lg">
        <label className="block text-sm font-medium mb-1">Destination URL</label>
        <input type="url" id="destination" className="w-full border border-gray-300 px-3 py-2 rounded mb-4" placeholder="https://example.com" />

        <div className="flex items-center mb-4">
          <input type="checkbox" id="collectLocation" className="mr-2" defaultChecked />
          <label htmlFor="collectLocation" className="text-sm">Collect location when opened</label>
        </div>

        <button
          onClick={generateLink}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Generate
        </button>

        {visible && (
          <div className="mt-4">
            <label className="block text-sm mb-1 font-medium">Your Tracking Link:</label>
            <input
              type="text"
              value={trackingLink}
              readOnly
              className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
            />
            <button
              onClick={() => navigator.clipboard.writeText(trackingLink)}
              className="text-sm text-blue-600 hover:underline"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
