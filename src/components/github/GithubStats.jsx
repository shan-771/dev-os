const stats = [
  ["Repositories", "24"],
  ["Stars", "128"],
  ["Pull Requests", "7"],
  ["Contributions", "342"],
];

export default function GithubStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {stats.map(([label, value]) => (

        <div
          key={label}
          className="rounded-2xl border border-white/[0.08] bg-[#111113]/95 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl transition hover:border-white/[0.14]"
        >

          <p className="text-sm text-gray-500">
            {label}
          </p>

          <p className="mt-4 text-3xl font-semibold tracking-tight">
            {value}
          </p>

        </div>

      ))}

    </div>
  );
}