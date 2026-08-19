import RepositoryCard from "./RepositoryCard";

const repositories = [
  {
    name: "DevOS",
    description: "Personal developer workspace",
    visibility: "Public",
    language: "JavaScript",
    stars: 24,
    forks: 3,
    updated: "2h ago",
  },
  {
    name: "KrishiMitra-AI",
    description: "AI-powered multilingual agriculture assistant",
    visibility: "Public",
    language: "Python",
    stars: 12,
    forks: 2,
    updated: "1d ago",
  },
  {
    name: "RetinaMambaNet",
    description: "Lightweight retinal vessel segmentation model",
    visibility: "Private",
    language: "Python",
    stars: 8,
    forks: 1,
    updated: "3d ago",
  },
];

export default function RepositorySection() {
  return (
    <section className="rounded-3xl border border-white/[0.08] bg-[#111113]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

        <div>

          <h2 className="text-lg font-semibold">
            Repositories
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your GitHub projects and repositories
          </p>

        </div>


        {/* Search */}

        <input
          type="text"
          placeholder="Search repositories..."
          className="w-full rounded-xl border border-white/[0.08] bg-[#151517] px-4 py-2.5 text-sm text-gray-300 outline-none placeholder:text-gray-600 transition focus:border-white/[0.16] lg:w-64"
        />

      </div>


      {/* Tabs */}

      <div className="mt-6 flex gap-2">

        <button className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black">
          All
        </button>

        <button className="rounded-xl border border-white/[0.08] bg-[#151517] px-4 py-2 text-sm text-gray-500 transition hover:border-white/[0.14] hover:text-gray-300">
          ★ Pinned
        </button>

      </div>


      {/* Repository List */}

      <div className="mt-5 space-y-3">

        {repositories.map((repo) => (

          <RepositoryCard
            key={repo.name}
            repo={repo}
          />

        ))}

      </div>

    </section>
  );
}