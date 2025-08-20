// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center p-8">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-3">Devotional Blessings</h1>
        <p className="opacity-80">
          Upload your photo → receive a short, reverent blessing video. Pure devotion. No parody.
        </p>
        <a
          href="/upload"
          className="inline-block mt-6 rounded-md border px-4 py-2"
        >
          Get Started
        </a>
      </div>
    </main>
  );
}

