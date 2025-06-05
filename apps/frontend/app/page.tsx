"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to ExponentialScape</h1>
      <p className="mt-4">Your analytics and collaboration platform.</p>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </main>
  );
}
