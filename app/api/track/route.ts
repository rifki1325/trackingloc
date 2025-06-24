import { NextRequest, NextResponse } from 'next/server'
import { linkStore } from '@/lib/linkStore'

export async function POST(req: NextRequest) {
  const { id, latitude, longitude } = await req.json()

  console.log('📍 Data lokasi diterima:')
  console.log('Link:', id)
  console.log('Latitude:', latitude)
  console.log('Longitude:', longitude)

  // Cari link tujuan berdasarkan ID
  const link = linkStore.find((item) => item.id === id)

  if (!link) {
    return NextResponse.json({ error: 'Link not found' }, { status: 404 })
  }

  return NextResponse.json({ destination: link.destination })
}
