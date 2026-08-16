import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export default function AppLayout({ children, active }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white">

      {/* =========================
          BACKGROUND
      ========================= */}

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


      {/* =========================
          APPLICATION SHELL
      ========================= */}

      <div className="relative z-10">

        <Sidebar active={active} />

        <TopNav />

        <main className="min-h-screen pt-16 lg:ml-64">
          {children}
        </main>

      </div>

    </div>
  );
}