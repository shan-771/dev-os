export default function PullRequestCard({ pullRequest }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#18181b] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition hover:border-white/[0.14]">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>

          <div className="flex items-center gap-2">

            <span className="text-sm text-gray-600">
              #{pullRequest.number}
            </span>

            <h3 className="font-medium">
              {pullRequest.title}
            </h3>

          </div>

          <p className="mt-2 text-sm text-gray-500">
            {pullRequest.repository}
          </p>

        </div>


        <span
          className={`w-fit rounded-full border px-3 py-1 text-xs ${
            pullRequest.status === "Open"
              ? "border-white/[0.08] bg-[#151517] text-gray-400"
              : "border-white/[0.08] bg-[#202023] text-gray-500"
          }`}
        >
          {pullRequest.status}
        </span>

      </div>


      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-500">

        <span>
          {pullRequest.author}
        </span>

        <span>
          {pullRequest.changes}
        </span>

        <span>
          {pullRequest.updated}
        </span>

      </div>

    </div>
  );
}