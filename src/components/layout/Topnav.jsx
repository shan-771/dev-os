export default function TopNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 lg:left-64">

      <div className="flex h-full items-center justify-between px-5 md:px-7">

        {/* =========================
            LEFT SIDE
        ========================= */}

        <div className="flex items-center gap-3">

          <span className="text-sm font-semibold tracking-tight lg:hidden">
            Developer OS
          </span>

        </div>

        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="flex items-center gap-2">

          {/* Search */}

          <button className="hidden rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2 text-sm text-gray-500 backdrop-blur-xl transition hover:bg-white/[0.05] hover:text-gray-300 md:block">
            Search
          </button>

          {/* Notification */}

          <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-sm text-gray-500 backdrop-blur-xl transition hover:bg-white/[0.05] hover:text-gray-300">
            ◇
          </button>

          {/* Profile */}

          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-sm font-medium backdrop-blur-xl">
            I
          </div>

        </div>

      </div>

    </header>
  );
}