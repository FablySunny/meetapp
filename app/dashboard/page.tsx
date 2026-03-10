'use client'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [joinCode, setJoinCode] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/login')
      else setUser(user)
    }
    getUser()
  }, [])

  const createMeeting = async () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    router.push(`/meeting/${code}`)
  }

  const joinMeeting = () => {
    if (joinCode.trim()) router.push(`/meeting/${joinCode.trim().toUpperCase()}`)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0b', color: 'white', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '28px', color: '#c9a84c' }}>MeetApp</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user && <span style={{ color: '#888' }}>{user.email}</span>}
          <button onClick={signOut} style={{ padding: '8px 16px', background: '#1a1a1f', color: 'white', border: '1px solid #333', borderRadius: '6px', cursor: 'pointer' }}>Sign Out</button>
        </div>
      </div>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '42px', marginBottom: '12px' }}>Video meetings for everyone</h2>
        <p style={{ color: '#888', marginBottom: '48px' }}>Create or join a meeting instantly</p>
        <button onClick={createMeeting} style={{ width: '100%', padding: '18px', background: '#c9a84c', color: 'black', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', marginBottom: '16px' }}>
          + Create New Meeting
        </button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input value={joinCode} onChange={e => setJoinCode(e.target.value)} placeholder="Enter meeting code..." style={{ flex: 1, padding: '16px', background: '#1a1a1f', color: 'white', border: '1px solid #333', borderRadius: '8px', fontSize: '16px' }} />
          <button onClick={joinMeeting} style={{ padding: '16px 24px', background: '#1a1a1f', color: 'white', border: '1px solid #333', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>Join</button>
        </div>
      </div>
    </div>
  )
}