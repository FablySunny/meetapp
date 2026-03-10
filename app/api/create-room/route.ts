export async function POST() {
  const res = await fetch('https://api.daily.co/v1/rooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DAILY_API_KEY}`
    },
    body: JSON.stringify({
      properties: { enable_chat: true, enable_screenshare: true }
    })
  })
  const room = await res.json()
  return Response.json({ url: room.url, name: room.name })
}