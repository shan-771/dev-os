import PullRequestCard from "./PullRequestCard";

const pullRequests = [
  {
    number: 42,
    title: "Fix authentication flow",
    repository: "DevOS",
    status: "Open",
    author: "@ishan",
    changes: "4 commits · 6 files",
    updated: "2h ago",
  },
  {
    number: 18,
    title: "Add GitHub integration",
    repository: "KrishiMitra-AI",
    status: "Open",
    author: "@ishan",
    changes: "7 commits · 12 files",
    updated: "1d ago",
  },
  {
    number: 11,
    title: "Improve model inference",
    repository: "RetinaMambaNet",
    status: "Merged",
    author: "@ishan",
    changes: "3 commits · 4 files",
    updated: "3d ago",
  },
];

export default function PullRequestSection() {
  return (
    <section className="rounded-3xl border border-white/[0.08] bg-[#111113]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>

          <h2 className="text-lg font-semibold">
            Pull Requests
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Pull requests that need your attention
          </p>

        </div>

        <button className="rounded-xl border border-white/[0.08] bg-[#151517] px-4 py-2 text-sm text-gray-400 transition hover:border-white/[0.14] hover:text-white">
          View all
        </button>

      </div>


      {/* Filters */}

      <div className="mt-6 flex flex-wrap gap-2">

        <button className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black">
          All
        </button>

        <button className="rounded-xl border border-white/[0.08] bg-[#151517] px-4 py-2 text-sm text-gray-500 transition hover:border-white/[0.14] hover:text-gray-300">
          Created by me
        </button>

        <button className="rounded-xl border border-white/[0.08] bg-[#151517] px-4 py-2 text-sm text-gray-500 transition hover:border-white/[0.14] hover:text-gray-300">
          Assigned to me
        </button>

        <button className="rounded-xl border border-white/[0.08] bg-[#151517] px-4 py-2 text-sm text-gray-500 transition hover:border-white/[0.14] hover:text-gray-300">
          Review requested
        </button>

      </div>


      {/* Pull Request List */}

      <div className="mt-5 space-y-3">

        {pullRequests.map((pullRequest) => (

          <PullRequestCard
            key={pullRequest.number}
            pullRequest={pullRequest}
          />

        ))}

      </div>

    </section>
  );
}