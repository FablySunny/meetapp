'use client'
import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function MeetingRoom() {
  const containerRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const router = useRouter()
  const [roomUrl, setRoomUrl] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const setupRoom = async () => {
      const res = await fetch('/api/create-room', { method: 'POST' })
      const data = await res.json()
      setRoomUrl(data.url)
      setLoading(false)
    }
    setupRoom()
  }, [])

  useEffect(() => {
    if (!roomUrl || !containerRef.current) return
    const loadDaily = async () => {
      const DailyIframe = (await import('@daily-co/daily-js')).default
      const frame = DailyIframe.createFrame(containerRef.current!, {
        showLeaveButton: true,
        showFullsc