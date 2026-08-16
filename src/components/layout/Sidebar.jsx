const navItems = [
  {
    name: "Dashboard",
    id: "dashboard",
    icon: "⌂",
    href: "/dashboard",
  },
  {
    name: "Projects",
    id: "projects",
    icon: "▣",
    href: "/projects",
  },
  {
    name: "Tasks",
    id: "tasks",
    icon: "✓",
    href: "/tasks",
  },
  {
    name: "GitHub",
    id: "github",
    icon: "⌘",
    href: "/github",
  },
  {
    name: "AI Assistant",
    id: "assistant",
    icon: "✦",
    href: "/assistant",
  },
];

export default function Sidebar({ active }) {
  return (
    <aside className="fixed bottom-0 left-0 top-0 z-40 hidden w-64 border-r border-white/[0.10] bg-[#111113] lg:block">

      <div className="flex h-full flex-col px-3 py-4">

        {/* =========================
            LOGO
        ========================= */}

        <div className="flex h-12 items-center gap-3 px-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-xs font-semibold">
            D
          </div>

          <span className="text-sm font-semibold tracking-tight">
            Developer OS
          </span>

        </div>


        {/* =========================
            WORKSPACE
        ========================= */}

        <button className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/[0.04]">

          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] text-xs">
            P
          </div>

          <div className="min-w-0 flex-1">

            <p className="truncate text-sm font-medium">
              Personal
            </p>

            <p className="truncate text-xs text-gray-600">
              Developer workspace
            </p>

          </div>

          <span className="text-xs text-gray-600">
            ⌄
          </span>

        </button>


        {/* =========================
            NAVIGATION
        ========================= */}

        <nav className="mt-6 space-y-1">

          {navItems.map((item) => {

            const isActive = active === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-white/[0.08] text-white"
                    : "text-gray-500 hover:bg-white/[0.04] hover:text-gray-300"
                }`}
              >

                <span
                  className={`flex w-5 justify-center text-sm ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 group-hover:text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>

                {item.name}

              </a>
            );

          })}

        </nav>


        {/* =========================
            BOTTOM
        ========================= */}

        <div className="mt-auto">

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-white/[0.04] hover:text-gray-300">

            <span className="flex w-5 justify-center text-sm">
              ⚙
            </span>

            Settings

          </button>


          <button className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-white/[0.04] hover:text-gray-300">

            <span className="flex w-5 justify-center text-sm">
              ?
            </span>

            Help

          </button>

        </div>

      </div>

    </aside>
  );
}