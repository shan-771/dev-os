import RepositoryCard from "./RepositoryCard";

export default function RepositorySection({ repositories }) {
  const repositoryList = repositories ?? [];

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
          {repositoryList.length}
        </span>

      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">

        {repositoryList.map((repository) => (
          <RepositoryCard
            key={repository.name}
            repo={repository}
          />
        ))}

      </div>

    </section>
  );
}