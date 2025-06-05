export const dynamic = 'force-dynamic'

export default async function MetricsPage() {
  const metricsRes = await fetch(`${process.env.API_URL}/api/metrics`, { cache: 'no-store' })
  const { views, messageCount } = await metricsRes.json()
  const msgsRes = await fetch(`${process.env.API_URL}/api/messages?sort=likes`, { cache: 'no-store' })
  const { messages } = await msgsRes.json()
  return (
    <main className="max-w-prose mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Site Metrics</h1>
      <p>Page views: {views}</p>
      <p>Total messages: {messageCount}</p>
      <h2 className="text-xl font-semibold mt-6">Trending Messages</h2>
      <ul className="space-y-2">
        {messages.slice(0, 5).map((m: any) => (
          <li key={m.id} className="border p-2 rounded flex justify-between dark:border-gray-700">
            <span>{m.text}</span>
            <span className="text-sm text-gray-500">Likes: {m.likes}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}
