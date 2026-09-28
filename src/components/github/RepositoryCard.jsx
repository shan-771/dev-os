export default function RepositoryCard({ repo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl border border-white/[0.08] bg-[#18181b] p-5 transition hover:border-white/[0.14]"
    >

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <h3 className="truncate text-base font-semibold">
            {repo.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
            {repo.description || "No description available"}
          </p>

        </div>

        <span className="shrink-0 rounded-lg border border-white/[0.08] px-2 py-1 text-xs text-gray-500">
          {repo.visibility}
        </span>

      </div>

      <div className="mt-5 flex items-center gap-5 text-xs text-gray-500">

        <span>
          ★ {repo.stars}
        </span>

        <span>
          Forks {repo.forks}
        </span>

        {repo.language && (
          <span>
            {repo.language}
          </span>
        )}

      </div>

    </a>
  );
}