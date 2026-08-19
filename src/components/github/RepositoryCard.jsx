export default function RepositoryCard({ repo }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#18181b] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition hover:border-white/[0.14]">

      {/* Repository Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>

          <div className="flex items-center gap-2">

            <h3 className="font-medium">
              {repo.name}
            </h3>

            <span className="rounded-full border border-white/[0.08] bg-[#151517] px-2.5 py-1 text-[10px] text-gray-500">
              {repo.visibility}
            </span>

          </div>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            {repo.description}
          </p>

        </div>

        <button className="w-fit rounded-xl border border-white/[0.08] bg-[#151517] px-3 py-2 text-xs text-gray-400 transition hover:border-white/[0.14] hover:text-white">
          View
        </button>

      </div>


      {/* Repository Metadata */}

      <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-gray-500">

        <span className="flex items-center gap-1.5">
          <span className="text-gray-400">●</span>
          {repo.language}
        </span>

        <span>
          ★ {repo.stars}
        </span>

        <span>
          ⑂ {repo.forks}
        </span>

        <span>
          Updated {repo.updated}
        </span>

      </div>

    </div>
  );
}