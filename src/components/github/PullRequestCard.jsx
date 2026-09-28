export default function PullRequestCard({ pullRequest }) {
  return (
    <a
      href={pullRequest.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl border border-white/[0.08] bg-[#18181b] p-5 transition hover:border-white/[0.14]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold">
            {pullRequest.title}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {pullRequest.repository}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-lg border px-2 py-1 text-xs ${
            pullRequest.state === "open"
              ? "border-green-500/20 text-green-400"
              : "border-white/[0.08] text-gray-500"
          }`}
        >
          {pullRequest.state}
        </span>
      </div>

      <div className="mt-5 text-xs text-gray-500">
        Updated{" "}
        {new Date(pullRequest.updated_at).toLocaleDateString()}
      </div>
    </a>
  );
}