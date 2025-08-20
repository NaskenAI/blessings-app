// src/app/upload/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadPage() {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const file = (e.currentTarget.elements.namedItem("photo") as HTMLInputElement).files?.[0];
    if (!file) return;

    const presign = await fetch("/api/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, fileType: file.type }),
    }).then(r => r.json());

    await fetch(presign.uploadUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });

    const job = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ s3Key: presign.key, effectId: "blessing", names: [] }),
    }).then(r => r.json());

    router.push(`/jobs/${job.id}`);
  }

  return (
    <form onSubmit={handle} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Create a Blessing</h1>
      <input name="photo" type="file" accept="image/*" required />
      <button disabled={busy} className="border rounded px-4 py-2">
        {busy ? "Uploading..." : "Generate Preview"}
      </button>
    </form>
  );
}

