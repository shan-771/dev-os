const stats = [
  ["Projects", "12"],
  ["Active Tasks", "24"],
  ["Completed", "86%"],
  ["GitHub Activity", "18"],
];

const projects = [
  {
    name: "Developer OS",
    description: "Personal developer workspace",
    status: "In Progress",
    progress: "72%",
    width: "w-[72%]",
  },
  {
    name: "KrishiMitra AI",
    description: "AI agriculture assistant",
    status: "Active",
    progress: "48%",
    width: "w-[48%]",
  },
];

const tasks = [
  ["High Priority", "Finish Login API"],
  ["Medium Priority", "Connect GitHub"],
  ["Low Priority", "Update documentation"],
];

export default function Dashboard() {
  return (
    <div className="min-h-screen">

      <div className="px-6 py-10 md:px-10">

        <div className="mx-auto max-w-7xl">

          {/* =========================
              HEADER
          ========================= */}

          <div className="mb-10">

            <p className="text-sm text-gray-500">
              Workspace
            </p>

            <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">

              <div>

                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  Good morning
                </h1>

                <p className="mt-3 text-gray-500">
                  Here’s what’s happening with your development work.
                </p>

              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#151517] px-4 py-2.5 text-sm text-gray-400 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                August 10, 2026
              </div>

            </div>

          </div>


          {/* =========================
              STATS
          ========================= */}

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


          {/* =========================
              PROJECTS + AI
          ========================= */}

          <div className="mt-6 grid gap-6 lg:grid-cols-3">

            {/* Recent Projects */}

            <section className="rounded-3xl border border-white/[0.08] bg-[#111113]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:col-span-2">

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-lg font-semibold">
                    Recent Projects
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Your active development projects
                  </p>

                </div>

                <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200">
                  View all
                </button>

              </div>


              <div className="mt-7 space-y-3">

                {projects.map((project) => (

                  <div
                    key={project.name}
                    className="rounded-2xl border border-white/[0.08] bg-[#18181b] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition hover:border-white/[0.14]"
                  >

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div>

                        <h3 className="font-medium">
                          {project.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {project.description}
                        </p>

                      </div>

                      <span className="w-fit rounded-full border border-white/[0.08] bg-[#151517] px-3 py-1 text-xs text-gray-400">
                        {project.status}
                      </span>

                    </div>


                    <div className="mt-5">

                      <div className="mb-2 flex justify-between text-xs text-gray-600">

                        <span>
                          Progress
                        </span>

                        <span>
                          {project.progress}
                        </span>

                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">

                        <div
                          className={`h-full ${project.width} rounded-full bg-white/[0.55]`}
                        />

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </section>


            {/* AI Assistant */}

            <section className="rounded-3xl border border-white/[0.08] bg-[#111113]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#202023] text-gray-300">
                  ✦
                </div>

                <div>

                  <h2 className="font-semibold">
                    AI Assistant
                  </h2>

                  <p className="text-xs text-gray-600">
                    Workspace insight
                  </p>

                </div>

              </div>


              <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#18181b] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">

                <p className="text-sm leading-6 text-gray-400">
                  Authentication is nearly complete. Finish the Login API
                  before starting the Payments module.
                </p>

              </div>


              <button className="mt-4 w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
                Ask AI
              </button>

            </section>

          </div>


          {/* =========================
              UPCOMING TASKS
          ========================= */}

          <section className="mt-6 rounded-3xl border border-white/[0.08] bg-[#111113]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">

            <div>

              <h2 className="text-lg font-semibold">
                Upcoming Tasks
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Things that need your attention
              </p>

            </div>


            <div className="mt-6 grid gap-3 md:grid-cols-3">

              {tasks.map(([priority, task]) => (

                <div
                  key={task}
                  className="rounded-2xl border border-white/[0.08] bg-[#18181b] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition hover:border-white/[0.14]"
                >

                  <p className="text-xs uppercase tracking-wider text-gray-600">
                    {priority}
                  </p>

                  <p className="mt-3 font-medium">
                    {task}
                  </p>

                  <div className="mt-5 h-1 rounded-full bg-white/[0.07]">

                    <div className="h-full w-1/3 rounded-full bg-white/[0.35]" />

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