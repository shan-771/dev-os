export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        {/* Top-left glow */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/[0.04] blur-[150px]" />

        {/* Bottom-right glow */}
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-white/[0.04] blur-[150px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Fade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_85%)]" />

      </div>

      {/* Page Content */}
      <div className="relative z-10">

        {/* Navbar */}
        <nav className="fixed left-1/2 top-5 z-50 flex w-[90%] max-w-7xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/[0.10] bg-[#111113]/95 px-7 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">

          <div className="text-xl font-semibold tracking-tight">
            Developer OS
          </div>

          <div className="hidden items-center gap-9 text-sm text-gray-400 md:flex">

            <a
              href="#features"
              className="transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#product"
              className="transition hover:text-white"
            >
              Product
            </a>

            <a
              href="#about"
              className="transition hover:text-white"
            >
              About
            </a>

          </div>

          <button className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200">
            Get Started
          </button>

        </nav>

        {/* Hero */}
        <section className="mx-auto flex min-h-[75vh] w-[90%] max-w-5xl flex-col items-center justify-center pt-20 text-center">

          <div className="rounded-full border border-white/[0.10] bg-[#151517]/95 px-5 py-2 text-sm text-gray-400 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl">
            AI-Powered Developer Workspace
          </div>

          <h1 className="mt-8 text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[76px]">
            The Operating System
            <br />
            <span className="text-gray-400">
              for Modern Developers
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Plan projects, manage tasks, connect your development workflow,
            and let AI help organize everything from one intelligent workspace.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <button className="rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200">
              Get Started
            </button>

            <a
              href="#product"
              className="rounded-xl border border-white/[0.10] bg-[#151517]/95 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition hover:bg-[#1b1b1e]"
            >
              View Product
            </a>

          </div>

        </section>

        {/* Product Preview */}
        <section
          id="product"
          className="mx-auto w-[90%] max-w-7xl pb-32"
        >

          <div className="overflow-hidden rounded-3xl border border-white/[0.10] bg-[#111113]/95 shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl">

            {/* Window Header */}
            <div className="flex items-center gap-2 border-b border-white/[0.08] bg-[#151517] px-5 py-4">

              <div className="h-3 w-3 rounded-full bg-white/25" />
              <div className="h-3 w-3 rounded-full bg-white/15" />
              <div className="h-3 w-3 rounded-full bg-white/15" />

            </div>

            <div className="flex min-h-[500px]">

              {/* Sidebar */}
              <aside className="hidden w-60 border-r border-white/[0.08] bg-[#0e0e10]/95 p-6 md:block">

                <div className="mb-10 text-sm font-semibold">
                  Developer OS
                </div>

                <div className="space-y-2 text-sm">

                  <div className="rounded-lg bg-white/[0.08] px-3 py-2 text-white">
                    Dashboard
                  </div>

                  <div className="px-3 py-2 text-gray-500">
                    Projects
                  </div>

                  <div className="px-3 py-2 text-gray-500">
                    Tasks
                  </div>

                  <div className="px-3 py-2 text-gray-500">
                    GitHub
                  </div>

                  <div className="px-3 py-2 text-gray-500">
                    AI Assistant
                  </div>

                </div>

              </aside>

              {/* Dashboard */}
              <div className="flex-1 bg-[#111113] p-6 md:p-10">

                <div className="mb-8">

                  <p className="text-sm text-gray-500">
                    Workspace
                  </p>

                  <h2 className="mt-1 text-2xl font-semibold">
                    Good morning
                  </h2>

                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-3">

                  <div className="rounded-2xl border border-white/[0.08] bg-[#18181b] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">

                    <p className="text-sm text-gray-500">
                      Projects
                    </p>

                    <p className="mt-3 text-3xl font-semibold">
                      12
                    </p>

                  </div>

                  <div className="rounded-2xl border border-white/[0.08] bg-[#18181b] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">

                    <p className="text-sm text-gray-500">
                      Active Tasks
                    </p>

                    <p className="mt-3 text-3xl font-semibold">
                      24
                    </p>

                  </div>

                  <div className="rounded-2xl border border-white/[0.08] bg-[#18181b] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">

                    <p className="text-sm text-gray-500">
                      Completed
                    </p>

                    <p className="mt-3 text-3xl font-semibold">
                      86%
                    </p>

                  </div>

                </div>

                {/* AI Card */}
                <div className="mt-5 rounded-2xl border border-white/[0.08] bg-[#18181b] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-[#202023]">
                      ✦
                    </div>

                    <div>

                      <p className="text-sm font-medium">
                        AI Assistant
                      </p>

                      <p className="text-xs text-gray-500">
                        Workspace insight
                      </p>

                    </div>

                  </div>

                  <p className="mt-5 text-sm leading-6 text-gray-400">
                    Authentication is nearly complete. Finish the Login API
                    before starting the Payments module.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Features */}
        <section
          id="features"
          className="mx-auto w-[90%] max-w-7xl pb-32"
        >

          <div className="mx-auto mb-16 max-w-2xl text-center">

            <p className="text-sm text-gray-500">
              Everything in one place
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Built around your workflow.
            </h2>

            <p className="mt-5 text-gray-500">
              Developer OS connects the tools and information you use
              throughout your development process.
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                title: "Projects",
                description:
                  "Organize projects and keep everything structured.",
              },
              {
                title: "Tasks",
                description:
                  "Plan, prioritize, and track your development work.",
              },
              {
                title: "GitHub",
                description:
                  "Bring repositories, commits, and pull requests together.",
              },
              {
                title: "AI Assistant",
                description:
                  "Turn your workspace data into useful insights.",
              },
            ].map((feature) => (

              <div
                key={feature.title}
                className="rounded-2xl border border-white/[0.08] bg-[#111113]/95 p-7 shadow-[0_15px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:border-white/[0.14] hover:bg-[#151517]"
              >

                <h3 className="text-lg font-medium">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* Final CTA */}
        <section
          id="about"
          className="relative mx-auto mb-20 w-[90%] max-w-4xl rounded-3xl border border-white/[0.08] bg-[#111113]/95 px-8 py-16 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
        >

          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Build better. Stay organized.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-gray-500">
            A single workspace designed around how developers actually work.
          </p>

        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.08] bg-[#0d0d0f] py-16 text-center">

          <h2 className="text-lg font-semibold">
            Developer OS
          </h2>

          <p className="mt-3 text-sm text-gray-600">
            Built for developers.
          </p>

        </footer>

      </div>

    </main>
  )
}