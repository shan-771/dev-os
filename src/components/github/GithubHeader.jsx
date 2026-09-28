export default function GithubHeader({ profile }) {
  return (
    <div className="mb-10">

      <p className="text-sm text-gray-500">
        GitHub
      </p>

      <div className="mt-2 flex flex-col justify-between gap-6 md:flex-row md:items-end">

        {/* User Info */}

        <div className="flex items-center gap-4">

          <img
            src={profile.avatar_url}
            alt={profile.username}
            className="h-16 w-16 rounded-2xl border border-white/[0.08] object-cover shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
          />

          <div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {profile.name || profile.username}
            </h1>

            <p className="mt-2 text-gray-500">
              @{profile.username}
            </p>

          </div>

        </div>
        {/* Actions */}

        <div className="flex gap-3">

          <a
            href={`https://github.com/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/[0.08] bg-[#151517] px-4 py-2.5 text-sm font-medium text-gray-400 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition hover:border-white/[0.14] hover:text-white"
          >
            View Profile
          </a>

          <button className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200">
            Sync GitHub
          </button>

        </div>

      </div>

      {profile.bio && (
        <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-500">
          {profile.bio}
        </p>
      )}

    </div>
  );
}