export const dynamic = 'force-dynamic'
'use client'
import { useState, FormEvent } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const res = await fetch(`${process.env.API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
    if (res.ok) {
      setSubmitted(true)
      setName('')
      setEmail('')
      setMessage('')
    }
  }

  return (
    <main className="max-w-md mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Contact Us</h1>
      {submitted ? (
        <p>Thanks for reaching out!</p>
      ) : (
        <form onSubmit={submit} className="space-y-2">
          <input
            className="w-full border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-700"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="w-full border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-700"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <textarea
            className="w-full border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-700"
            placeholder="Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded" type="submit">
            Send
          </button>
        </form>
      )}
    </main>
  )
}
