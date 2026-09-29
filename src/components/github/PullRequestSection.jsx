import PullRequestCard from "./PullRequestCard";

export default function PullRequestSection({ pullRequests }) {
  const pullRequestList = pullRequests ?? [];

  return (
    <section className="rounded-3xl border border-white/[0.08] bg-[#111113]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Pull Requests
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your recent GitHub pull requests
          </p>
        </div>

        <span className="text-sm text-gray-500">
          {pullRequestList.length}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {pullRequestList.length === 0 ? (
          <p className="text-sm text-gray-500">
            No pull requests found.
          </p>
        ) : (
          pullRequestList.map((pullRequest) => (
            <PullRequestCard
              key={`${pullRequest.repository}-${pullRequest.created_at}`}
              pullRequest={pullRequest}
            />
          ))
        )}
      </div>
    </section>
  );
}