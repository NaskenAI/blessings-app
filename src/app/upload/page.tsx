"use client";
import { useState } from "react";

export default function UploadPage() {
  const [status, setStatus] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    // ask backend for signed URL
    const res = await fetch("/api/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, fileType: file.type }),
    });
    const { uploadUrl, key } = await res.json();

    // upload directly to S3
    await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    setStatus(`Uploaded to ${key}`);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Upload Photo for Blessing</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {status && <p className="mt-3">{status}</p>}
    </div>
  );
}

