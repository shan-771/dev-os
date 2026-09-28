import { useEffect, useState } from "react";

export default function GithubActivity({ profile }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/github/activity/${profile.username}`)
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch((error) => {
        console.error("Failed to fetch GitHub activity:", error);
      });
  }, [profile.username]);

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

              {activity.type === "PullRequestEvent" && "↗"}
              {activity.type === "PushEvent" && "↑"}
              {activity.type === "CreateEvent" && "◈"}
              {activity.type === "WatchEvent" && "★"}

              {![
                "PullRequestEvent",
                "PushEvent",
                "CreateEvent",
                "WatchEvent",
              ].includes(activity.type) && "•"}

            </div>

            {/* Activity Content */}

            <div className="min-w-0 flex-1">

              <div className="flex flex-col justify-between gap-1 sm:flex-row">

                <p className="text-sm font-medium">
                  {activity.type.replace("Event", "")}
                </p>

                <span className="text-xs text-gray-600">
                  {new Date(activity.created_at).toLocaleString()}
                </span>

              </div>

              <p className="mt-1 text-sm text-gray-500">

                {activity.type === "PushEvent"
                  ? "Pushed changes"
                  : activity.type === "PullRequestEvent"
                  ? "Pull request activity"
                  : activity.type === "CreateEvent"
                  ? "Created repository or branch"
                  : activity.type === "WatchEvent"
                  ? "Starred repository"
                  : "GitHub activity"}

              </p>

              <p className="mt-2 text-xs text-gray-600">
                {activity.repo}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}