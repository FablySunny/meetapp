'use client'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/dashboard` }
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0a0b', color: 'white' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>MeetApp</h1>
      <p style={{ color: '#888', marginBottom: '40px' }}>Video meetings, simplified</p>
      <button onClick={signInWithGoogle} style={{ padding: '14px 32px', background: 'white', color: 'black', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: '600' }}>
        Sign in with Google
      </button>
    </div>
  )
}