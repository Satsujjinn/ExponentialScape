export const dynamic = 'force-dynamic';

import MessageBoard from '../components/MessageBoard';

export default async function Page() {
  const viewRes = await fetch(`${process.env.API_URL}/api/views`, {
    method: 'POST',
    cache: 'no-store',
  });
  const { views } = await viewRes.json();
  const helloRes = await fetch(`${process.env.API_URL}/api/hello`, { cache: 'no-store' });
  const hello = await helloRes.json();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to ExponentialScape</h1>
      <p className="mt-4">Your analytics and collaboration platform.</p>
      <p className="mt-2 text-sm text-gray-600">Page views: {views}</p>
      {hello.message && <p className="mt-2 text-sm text-gray-600">{hello.message}</p>}
      <MessageBoard />
    </main>
  );
}
