import { useEffect, useState } from "react";
import PullRequestCard from "./PullRequestCard";

export default function PullRequestSection() {
  const [pullRequests, setPullRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/github/pulls/shan-771")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch pull requests");
        }

        return response.json();
      })
      .then((data) => {
        setPullRequests(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="rounded-3xl border border-white/[0.08] bg-[#111113]/95 p-6">
        <p className="text-sm text-gray-500">
          Loading pull requests...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-3xl border border-white/[0.08] bg-[#111113]/95 p-6">
        <p className="text-sm text-red-400">
          {error}
        </p>
      </section>
    );
  }

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
          {pullRequests.length}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {pullRequests.length === 0 ? (
          <p className="text-sm text-gray-500">
            No pull requests found.
          </p>
        ) : (
          pullRequests.map((pullRequest) => (
            <PullRequestCard
              key={`${pullRequest.repository}-${pullRequest.number}`}
              pullRequest={pullRequest}
            />
          ))
        )}
      </div>
    </section>
  );
}

