const stats = [
  ["Total Projects", "12"],
  ["Active", "5"],
  ["In Progress", "4"],
  ["Completed", "3"],
];

const projects = [
  {
    name: "Developer OS",
    description:
      "Personal developer workspace and productivity system",
    status: "In Progress",
    progress: "72%",
    width: "w-[72%]",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    updated: "Updated today",
    icon: "D",
  },
  {
    name: "KrishiMitra AI",
    description:
      "Multilingual AI assistant for agriculture",
    status: "Active",
    progress: "48%",
    width: "w-[48%]",
    stack: ["Python", "FastAPI", "AI"],
    updated: "Updated yesterday",
    icon: "K",
  },
  {
    name: "Work Wise",
    description:
      "Productivity and workflow management platform",
    status: "Completed",
    progress: "100%",
    width: "w-full",
    stack: ["React", "Flask", "Firebase"],
    updated: "Updated 3 days ago",
    icon: "W",
  },
  {
    name: "RetinaMamba",
    description:
      "Lightweight retinal vessel segmentation model",
    status: "In Progress",
    progress: "64%",
    width: "w-[64%]",
    stack: ["PyTorch", "Mamba", "OpenCV"],
    updated: "Updated 5 days ago",
    icon: "R",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen">

      <div className="px-6 py-10 md:px-10">

        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <div className="mb-10">

            <p className="text-sm text-gray-500">
              Workspace
            </p>

            <div className="mt-2 flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  Projects
                </h1>

                <p className="mt-3 text-gray-500">
                  Manage and track your development work.
                </p>

              </div>

              <button className="w-fit rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200">
                + New Project
              </button>

            </div>

          </div>


          {/* STATS */}
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


          {/* SEARCH + FILTERS */}
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div className="flex w-full max-w-md items-center rounded-xl border border-white/[0.08] bg-[#111113]/95 px-4 py-2.5 backdrop-blur-xl">

              <span className="mr-3 text-sm text-gray-600">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search projects..."
                className="w-full bg-transparent text-sm text-gray-300 outline-none placeholder:text-gray-600"
              />

            </div>


            <div className="flex gap-2 overflow-x-auto">

              <button className="whitespace-nowrap rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black">
                All
              </button>

              <button className="whitespace-nowrap rounded-xl border border-white/[0.08] bg-[#111113]/95 px-4 py-2.5 text-sm text-gray-500 transition hover:bg-white/[0.05] hover:text-gray-300">
                Active
              </button>

              <button className="whitespace-nowrap rounded-xl border border-white/[0.08] bg-[#111113]/95 px-4 py-2.5 text-sm text-gray-500 transition hover:bg-white/[0.05] hover:text-gray-300">
                In Progress
              </button>

              <button className="whitespace-nowrap rounded-xl border border-white/[0.08] bg-[#111113]/95 px-4 py-2.5 text-sm text-gray-500 transition hover:bg-white/[0.05] hover:text-gray-300">
                Completed
              </button>

            </div>

          </div>


          {/* PROJECTS */}
          <section className="mt-6">

            <div className="mb-5">

              <h2 className="text-lg font-semibold">
                All Projects
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your development projects and their current progress.
              </p>

            </div>


            <div className="grid gap-5 md:grid-cols-2">

              {projects.map((project) => (

                <div
                  key={project.name}
                  className="group rounded-3xl border border-white/[0.08] bg-[#111113]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-white/[0.14]"
                >

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-[#202023] text-sm font-semibold">
                        {project.icon}
                      </div>

                      <div>

                        <h3 className="font-semibold">
                          {project.name}
                        </h3>

                        <p className="mt-1 text-xs text-gray-600">
                          {project.updated}
                        </p>

                      </div>

                    </div>


                    <span className="rounded-full border border-white/[0.08] bg-[#151517] px-3 py-1 text-xs text-gray-400">
                      {project.status}
                    </span>

                  </div>


                  {/* DESCRIPTION */}
                  <p className="mt-5 text-sm leading-6 text-gray-500">
                    {project.description}
                  </p>


                  {/* TECH STACK */}
                  <div className="mt-5 flex flex-wrap gap-2">

                    {project.stack.map((tech) => (

                      <span
                        key={tech}
                        className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-xs text-gray-500"
                      >
                        {tech}
                      </span>

                    ))}

                  </div>


                  {/* PROGRESS */}
                  <div className="mt-6">

                    <div className="mb-2 flex justify-between text-xs">

                      <span className="text-gray-600">
                        Progress
                      </span>

                      <span className="text-gray-500">
                        {project.progress}
                      </span>

                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">

                      <div
                        className={`h-full ${project.width} rounded-full bg-white/[0.55]`}
                      />

                    </div>

                  </div>


                  {/* BOTTOM */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">

                    <span className="text-xs text-gray-600">
                      View project
                    </span>

                    <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-sm text-gray-500 transition group-hover:bg-white/[0.06] group-hover:text-white">
                      →
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>


          <div className="h-20" />

        </div>

      </div>

    </div>
  );
}