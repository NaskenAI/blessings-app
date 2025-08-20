"use client";
import { useState } from "react";

export default function UploadPage() {
  const [status, setStatus] = useState<string>("");

  async function createJob(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Submitting...");
    const res = await fetch("/api/jobs", {
      method: "POST",
      body: JSON.stringify({ effectId: "blessing" }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setStatus(`Job ${data.id} is ${data.status}`);
  }

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create a Blessing</h1>
      <form onSubmit={createJob} className="space-y-4">
        <input type="file" accept="image/*" className="block w-full" required />
        <button className="rounded-md border px-4 py-2">Generate</button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </main>
  );
}

