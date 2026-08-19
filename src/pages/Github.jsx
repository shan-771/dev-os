import GithubHeader from "../components/github/GithubHeader";
import GithubStats from "../components/github/GithubStats";
import RepositorySection from "../components/github/RepositorySection";
import PullRequestSection from "../components/github/PullRequestSection";
import GithubActivity from "../components/github/GithubActivity";

export default function Github() {
  return (
    <div className="min-h-screen">

      <div className="px-6 py-10 md:px-10">

        <div className="mx-auto max-w-7xl">

          {/* =========================
              GITHUB HEADER
          ========================= */}

          <GithubHeader />


          {/* =========================
              GITHUB STATS
          ========================= */}

          <GithubStats />


          {/* =========================
              REPOSITORIES
          ========================= */}

          <div className="mt-6">

            <RepositorySection />

          </div>


          {/* =========================
              PULL REQUESTS + ACTIVITY
          ========================= */}

          <div className="mt-6 grid gap-6 lg:grid-cols-3">

            <div className="lg:col-span-2">

              <PullRequestSection />

            </div>

            <GithubActivity />

          </div>


          <div className="h-20" />

        </div>

      </div>

    </div>
  );
}