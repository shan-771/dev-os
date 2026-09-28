import { useEffect, useState } from "react";
import RepositoryCard from "./RepositoryCard";

export default function RepositorySection() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/github/repos/shan-771")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        return response.json();
      })
      .then((data) => {
        setRepositories(data);
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
          Loading repositories...
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
            Repositories
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your public GitHub repositories
          </p>
        </div>

        <span className="text-sm text-gray-500">
          {repositories.length}
        </span>

      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">

        {repositories.map((repository) => (
          <RepositoryCard
            key={repository.name}
            repo={repository}
          />
        ))}

      </div>

    </section>
  );
}