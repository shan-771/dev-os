const activities = [
  {
    type: "Pull Request",
    title: "Opened PR #42",
    description: "Fix authentication flow",
    repository: "DevOS",
    time: "2 hours ago",
  },
  {
    type: "Pull Request",
    title: "Merged PR #38",
    description: "Add GitHub integration",
    repository: "KrishiMitra-AI",
    time: "1 day ago",
  },
  {
    type: "Repository",
    title: "Created repository",
    description: "RetinaMambaNet",
    repository: "RetinaMambaNet",
    time: "3 days ago",
  },
  {
    type: "Star",
    title: "Starred repository",
    description: "next.js",
    repository: "vercel/next.js",
    time: "5 days ago",
  },
];

export default function GithubActivity() {
  return (
    <section className="rounded-3xl border border-white/[0.08] bg-[#111113]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">

      {/* Header */}

      <div>

        <h2 className="text-lg font-semibold">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your latest activity across GitHub
        </p>

      </div>


      {/* Activity List */}

      <div className="mt-6 space-y-3">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="flex gap-4 rounded-2xl border border-white/[0.08] bg-[#18181b] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition hover:border-white/[0.14]"
          >

            {/* Activity Icon */}

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#202023] text-sm text-gray-400">
              {activity.type === "Pull Request" && "↗"}
              {activity.type === "Repository" && "◈"}
              {activity.type === "Star" && "★"}
            </div>


            {/* Activity Content */}

            <div className="min-w-0 flex-1">

              <div className="flex flex-col justify-between gap-1 sm:flex-row">

                <p className="text-sm font-medium">
                  {activity.title}
                </p>

                <span className="text-xs text-gray-600">
                  {activity.time}
                </span>

              </div>

              <p className="mt-1 text-sm text-gray-500">
                {activity.description}
              </p>

              <p className="mt-2 text-xs text-gray-600">
                {activity.repository}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}