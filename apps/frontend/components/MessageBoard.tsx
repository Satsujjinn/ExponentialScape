'use client'
import { useEffect, useState, FormEvent } from 'react'

interface Message {
  id: number
  text: string
  timestamp: string
  likes: number
}

export default function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')

  const like = async (id: number) => {
    const res = await fetch(`${process.env.API_URL}/api/messages/${id}/like`, { method: 'POST' })
    if (res.ok) {
      const updated = await res.json()
      setMessages(prev => prev.map(m => (m.id === id ? updated : m)))
    }
  }

  useEffect(() => {
    fetch(`${process.env.API_URL}/api/messages`).then(res => res.json()).then(data => {
      setMessages(data.messages)
    })
  }, [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    const res = await fetch(`${process.env.API_URL}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    if (res.ok) {
      const msg = await res.json()
      setMessages(prev => [...prev, msg])
      setText('')
    }
  }

  return (
    <section className="w-full max-w-md mt-8">
      <h2 className="text-xl font-semibold mb-2">Message Board</h2>
      <form onSubmit={submit} className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-700"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a message"
        />
        <button className="bg-blue-500 text-white px-3 py-1 rounded" type="submit">
          Send
        </button>
      </form>
      <ul className="mt-4 space-y-2">
        {messages.map(m => (
          <li key={m.id} className="border p-2 rounded space-y-1 dark:border-gray-700">
            <div>{m.text}</div>
            <div className="text-xs text-gray-500">
              {new Date(m.timestamp).toLocaleString()}
            </div>
            <button
              className="text-sm text-blue-600 dark:text-blue-400"
              onClick={() => like(m.id)}
              type="button"
            >
              Like ({m.likes})
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
