export async function POST(request: Request) {
  const body = await request.json()
  const { lat, lon, link } = body

  console.log('📍 Data lokasi diterima:')
  console.log('Link:', link)
  console.log('Latitude:', lat)
  console.log('Longitude:', lon)

  return new Response(JSON.stringify({ message: 'Lokasi berhasil diterima' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
