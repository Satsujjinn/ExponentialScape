export const dynamic = 'force-dynamic';

export default async function Page() {
  const res = await fetch(`${process.env.API_URL}/api/hello`, { cache: 'no-store' });
  const data = await res.json();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to ExponentialScape</h1>
      <p className="mt-4">Your analytics and collaboration platform.</p>
      {data.message && <p className="mt-2 text-sm text-gray-600">{data.message}</p>}
    </main>
  );
}
