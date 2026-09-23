export default function NewsHubLoading() {
  return (
    <main className="news-hub-page min-h-screen bg-[#fff8f1] text-[#171412]">
      <div className="h-[72px] border-b border-[#f3e7dc] bg-white/90 md:h-[88px]" />
      <div className="news-hub-topics">
        <div className="news-hub-topics-inner animate-pulse">
          <div className="h-4 w-36 rounded bg-[#f0dcc8]" />
          <div className="flex flex-wrap gap-4">
            <div className="h-5 w-32 rounded bg-[#f0dcc8]" />
            <div className="h-5 w-36 rounded bg-[#f0dcc8]" />
            <div className="h-5 w-40 rounded bg-[#f0dcc8]" />
          </div>
        </div>
      </div>
      <div className="news-hub-content">
        <div className="news-hub-content-inner animate-pulse">
          {[0, 1].map((section) => (
            <section key={section} className="news-hub-category">
              <div className="mb-5 flex items-end justify-between gap-4 border-b border-[rgba(234,88,20,0.18)] pb-3.5">
                <div className="h-8 w-52 rounded bg-[#ffe0c8]" />
                <div className="h-4 w-20 rounded bg-[#f3e7dc]" />
              </div>
              <div className="flex gap-4 overflow-hidden">
                {[0, 1, 2].map((card) => (
                  <div
                    key={card}
                    className="min-w-[min(84vw,280px)] flex-1 overflow-hidden rounded-[18px] border border-[rgba(234,88,20,0.16)] bg-white"
                  >
                    <div className="aspect-[16/10] bg-[#f3e7dc]" />
                    <div className="space-y-2 p-4">
                      <div className="h-5 w-28 rounded-full bg-[#ffe8d6]" />
                      <div className="h-3 w-24 rounded bg-[#f3e7dc]" />
                      <div className="h-5 w-[92%] rounded bg-[#f3e7dc]" />
                      <div className="h-4 w-full rounded bg-[#f8f1ea]" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
          <p className="text-center text-sm font-medium text-[#b08968]">Đang tải tin tức…</p>
        </div>
      </div>
    </main>
  );
}
