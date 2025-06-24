import { NextResponse } from 'next/server'

// Simpan data tracking secara sementara di memory
// (untuk tahap lanjut, bisa diganti jadi database)
const linkStore = new Map<string, string>()

export async function POST(request: Request) {
  const body = await request.json()
  const { destination } = body

  // Buat ID unik
  const id = Math.random().toString(36).substring(2, 8)

  // Simpan ke memory
  linkStore.set(id, destination)

  // Kembalikan link tracking
  const fullLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/t/${id}`

  return NextResponse.json({ id, trackingLink: fullLink })
}

// Tambahkan ini supaya halaman redirect bisa baca
export function GET() {
  return NextResponse.json(Object.fromEntries(linkStore.entries()))
}

export { linkStore } // supaya bisa diakses dari file lain
