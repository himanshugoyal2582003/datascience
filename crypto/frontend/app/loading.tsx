export default function Loading() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="hidden w-52 border-r border-zinc-800 bg-zinc-950 p-4 lg:block">
        <div className="mb-8 h-10 animate-pulse rounded-lg bg-zinc-900" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="h-9 animate-pulse rounded-lg bg-zinc-900" />
          ))}
        </div>
      </aside>
      <main className="flex-1 p-5">
        <p className="mb-4 text-xs uppercase tracking-[0.28em] text-zinc-500">
          Loading Intelligence...
        </p>
        <div className="mb-4 h-14 animate-pulse rounded-xl bg-zinc-900" />
        <div className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-16 animate-pulse rounded-xl bg-zinc-900" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {[1, 2].map((item) => (
            <div key={item} className="h-72 animate-pulse rounded-xl bg-zinc-900" />
          ))}
        </div>
      </main>
    </div>
  );
}
