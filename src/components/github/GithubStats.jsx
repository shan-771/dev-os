import { useEffect, useState } from "react";

export default function GithubStats({ profile }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/github/stats/${profile.username}`)
      .then((response) => response.json())
      .then((data) => setStats(data));
  }, [profile.username]);


  const statItems = [
    ["Repositories", stats?.repositories ?? "—"],
    ["Stars", stats?.stars ?? "—"],
    ["Pull Requests", stats?.pull_requests ?? "—"],
    ["Contributions", "—"],
  ];


  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {statItems.map(([label, value]) => (

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