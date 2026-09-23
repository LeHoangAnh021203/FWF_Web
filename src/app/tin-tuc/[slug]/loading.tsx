export default function NewsArticleLoading() {
  return (
    <main className="min-h-screen bg-white text-[#171412]">
      <div className="h-[72px] border-b border-[#f3e7dc] bg-white/90 md:h-[88px]" />
      <div className="mx-auto w-full max-w-[1400px] animate-pulse px-4 pb-16 pt-10 sm:px-6 md:px-8 md:pb-24 md:pt-12">
        <div className="mb-8 flex gap-2">
          <div className="h-4 w-16 rounded bg-[#f3e7dc]" />
          <div className="h-4 w-3 rounded bg-[#f3e7dc]" />
          <div className="h-4 w-20 rounded bg-[#f3e7dc]" />
          <div className="h-4 w-3 rounded bg-[#f3e7dc]" />
          <div className="h-4 w-40 rounded bg-[#ffe0c8]" />
        </div>

        <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] xl:gap-12">
          <div className="min-w-0">
            <div className="mb-5 flex gap-3">
              <div className="h-5 w-36 rounded bg-[#f3e7dc]" />
              <div className="h-7 w-28 rounded-full bg-[#fff1c9]" />
            </div>
            <div className="space-y-3">
              <div className="h-9 w-[92%] rounded bg-[#f3e7dc]" />
              <div className="h-9 w-[70%] rounded bg-[#f3e7dc]" />
            </div>
            <div className="mt-6 space-y-2">
              <div className="h-5 w-full rounded bg-[#ffe8d6]" />
              <div className="h-5 w-[88%] rounded bg-[#ffe8d6]" />
            </div>
            <div className="mt-8 aspect-[16/10] rounded-[28px] bg-[#fff7ed] md:rounded-[36px]" />
            <div className="mt-8 space-y-3">
              <div className="h-4 w-full rounded bg-[#f3e7dc]" />
              <div className="h-4 w-full rounded bg-[#f3e7dc]" />
              <div className="h-4 w-[94%] rounded bg-[#f3e7dc]" />
              <div className="h-4 w-[86%] rounded bg-[#f3e7dc]" />
            </div>
          </div>

          <aside className="hidden xl:block">
            <div className="rounded-[40px] bg-[#f5f5f5] p-8">
              <div className="mb-8 h-7 w-40 rounded bg-[#e8e8e8]" />
              <div className="grid gap-7">
                {[0, 1].map((key) => (
                  <div key={key}>
                    <div className="aspect-[16/10] rounded-[18px] bg-white" />
                    <div className="mt-4 h-4 w-28 rounded bg-[#e8e8e8]" />
                    <div className="mt-2 h-5 w-[90%] rounded bg-[#e8e8e8]" />
                    <div className="mt-2 h-4 w-full rounded bg-[#ececec]" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <p className="mt-10 text-center text-sm font-medium text-[#b08968]">
          Đang tải bài viết…
        </p>
      </div>
    </main>
  );
}
