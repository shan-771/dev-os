export default function GithubHeader() {
  return (
    <div className="mb-10">

      <p className="text-sm text-gray-500">
        GitHub
      </p>

      <div className="mt-2 flex flex-col justify-between gap-6 md:flex-row md:items-end">

        {/* User Info */}

        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#18181b] text-xl font-semibold text-gray-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
            I
          </div>

          <div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              GitHub
            </h1>

            <p className="mt-2 text-gray-500">
              @ishan
            </p>

          </div>

        </div>


        {/* Actions */}

        <div className="flex gap-3">

          <button className="rounded-xl border border-white/[0.08] bg-[#151517] px-4 py-2.5 text-sm font-medium text-gray-400 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition hover:border-white/[0.14] hover:text-white">
            View Profile
          </button>

          <button className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200">
            Sync GitHub
          </button>

        </div>

      </div>

    </div>
  );
}