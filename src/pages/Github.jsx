import { useEffect, useState } from "react";

import GithubHeader from "../components/github/GithubHeader";
import GithubStats from "../components/github/GithubStats";
import RepositorySection from "../components/github/RepositorySection";
import PullRequestSection from "../components/github/PullRequestSection";
import GithubActivity from "../components/github/GithubActivity";

export default function Github() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/github/dashboard/shan-771")
      .then((response) => {
        if (!response.ok) 
          {throw new Error("Failed to fetch GitHub dashboard");
        }

        return response.json();
      })
      .then((data) => {
        setDashboard(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-10 text-gray-400">Loading GitHub...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="px-6 py-10 md:px-10">
        <div className="mx-auto max-w-7xl">

            <GithubHeader profile={dashboard.profile} />

            <GithubStats stats={dashboard.stats} />

          <div className="mt-6">
            <RepositorySection repositories={dashboard.repositories} />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PullRequestSection pullRequests={dashboard.pull_requests} />
            </div>
                          
              <GithubActivity activity={dashboard.activity} />
          </div>

          <div className="h-20" />

        </div>
      </div>
    </div>
  );
}