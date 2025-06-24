import { NextRequest, NextResponse } from 'next/server'
import { linkStore } from '@/lib/linkStore'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  const { destination } = await request.json()
  const id = nanoid(6)

  linkStore.push({
    id,
    destination,
    createdAt: new Date(),
  })

  const trackingLink = `${request.nextUrl.origin}/t/${id}`

  return NextResponse.json({ trackingLink })
}
