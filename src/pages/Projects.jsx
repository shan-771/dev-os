import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

const filters = [
  "All",
  "Active",
  "In Progress",
  "On Hold",
  "Completed",
];

const statuses = [
  "Active",
  "In Progress",
  "On Hold",
  "Completed",
];

export default function Projects() {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [projectTitle, setProjectTitle] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [creating, setCreating] =
    useState(false);

  const [error, setError] =
    useState("");


  // ---------------------------------------------------------
  // LOAD PROJECTS
  // ---------------------------------------------------------

  const loadProjects = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/projects`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load projects"
        );
      }

      const data =
        await response.json();

      setProjects(data);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to connect to the Developer OS backend."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadProjects();
  }, []);


  // ---------------------------------------------------------
  // CREATE PROJECT
  // ---------------------------------------------------------

  const createProject = async () => {

    const title =
      projectTitle.trim();

    if (!title || creating) return;

    try {

      setCreating(true);
      setError("");

      const response = await fetch(
        `${API_URL}/projects`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: title,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.detail ||
          "Failed to create project"
        );

      }

      setProjects((current) => [
        ...current,
        data,
      ]);

      setProjectTitle("");
      setShowModal(false);

    } catch (error) {

      console.error(error);
      setError(error.message);

    } finally {

      setCreating(false);

    }
  };


  // ---------------------------------------------------------
  // UPDATE STATUS
  // ---------------------------------------------------------

  const updateStatus = async (
    project,
    status
  ) => {

    try {

      setError("");

      const response = await fetch(
        `${API_URL}/projects/${encodeURIComponent(
          project.id
        )}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.detail ||
          "Failed to update status"
        );

      }

      setProjects((current) =>
        current.map((item) =>
          item.id === project.id
            ? data
            : item
        )
      );

    } catch (error) {

      console.error(error);
      setError(error.message);

    }
  };


  // ---------------------------------------------------------
  // DELETE PROJECT
  // ---------------------------------------------------------

  const deleteProject = async (
    project
  ) => {

    const confirmed =
      window.confirm(
        `Delete "${project.name}"?\n\nThis will permanently delete the project folder and all its files.`
      );

    if (!confirmed) return;

    try {

      setError("");

      const response = await fetch(
        `${API_URL}/projects/${encodeURIComponent(
          project.id
        )}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.detail ||
          "Failed to delete project"
        );

      }

      setProjects((current) =>
        current.filter(
          (item) =>
            item.id !== project.id
        )
      );

    } catch (error) {

      console.error(error);
      setError(error.message);

    }
  };


  // ---------------------------------------------------------
  // FILTER
  // ---------------------------------------------------------

  const filteredProjects =
    useMemo(() => {

      return projects.filter(
        (project) => {

          const matchesSearch =
            project.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesFilter =
            activeFilter === "All" ||
            project.status ===
              activeFilter;

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );

    }, [
      projects,
      search,
      activeFilter,
    ]);


  // ---------------------------------------------------------
  // STATS
  // ---------------------------------------------------------

  const stats = [
    [
      "Total Projects",
      projects.length,
    ],
    [
      "Active",
      projects.filter(
        (p) => p.status === "Active"
      ).length,
    ],
    [
      "In Progress",
      projects.filter(
        (p) =>
          p.status === "In Progress"
      ).length,
    ],
    [
      "Completed",
      projects.filter(
        (p) =>
          p.status === "Completed"
      ).length,
    ],
  ];


  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------

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

              <button
                onClick={() =>
                  setShowModal(true)
                }
                className="w-fit rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                + New Project
              </button>

            </div>

          </div>


          {/* ERROR */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}


          {/* STATS */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {stats.map(
              ([label, value]) => (

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

              )
            )}

          </div>


          {/* SEARCH + FILTERS */}

          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div className="flex w-full max-w-md items-center rounded-xl border border-white/[0.08] bg-[#111113]/95 px-4 py-2.5">

              <span className="mr-3 text-sm text-gray-600">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search projects..."
                className="w-full bg-transparent text-sm text-gray-300 outline-none placeholder:text-gray-600"
              />

            </div>


            <div className="flex gap-2 overflow-x-auto">

              {filters.map(
                (filter) => (

                  <button
                    key={filter}
                    onClick={() =>
                      setActiveFilter(
                        filter
                      )
                    }
                    className={
                      activeFilter ===
                      filter
                        ? "whitespace-nowrap rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black"
                        : "whitespace-nowrap rounded-xl border border-white/[0.08] bg-[#111113]/95 px-4 py-2.5 text-sm text-gray-500 transition hover:bg-white/[0.05] hover:text-gray-300"
                    }
                  >
                    {filter}
                  </button>

                )
              )}

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


            {loading ? (

              <div className="rounded-3xl border border-white/[0.08] bg-[#111113]/95 p-10 text-center text-sm text-gray-500">
                Loading projects...
              </div>

            ) : filteredProjects.length === 0 ? (

              <div className="rounded-3xl border border-white/[0.08] bg-[#111113]/95 p-10 text-center">

                <p className="text-sm text-gray-500">
                  {projects.length === 0
                    ? "No projects yet."
                    : "No projects match your search."}
                </p>

              </div>

            ) : (

              <div className="grid gap-5 md:grid-cols-2">

                {filteredProjects.map(
                  (project) => (

                    <div
                      key={project.id}
                      className="group rounded-3xl border border-white/[0.08] bg-[#111113]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-white/[0.14]"
                    >

                      {/* TOP */}

                      <div className="flex items-start justify-between gap-4">

                        <div
                          className="flex min-w-0 cursor-pointer items-center gap-3"
                          onClick={() =>
                            navigate(
                              `/projects/${encodeURIComponent(
                                project.id
                              )}`
                            )
                          }
                        >

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#202023] text-sm font-semibold">
                            {project.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">

                            <h3 className="truncate font-semibold">
                              {project.name}
                            </h3>

                            <p className="mt-1 text-xs text-gray-600">
                              Developer workspace
                            </p>

                          </div>

                        </div>


                        {/* DELETE */}

                        <button
                          onClick={() =>
                            deleteProject(
                              project
                            )
                          }
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-xs text-gray-600 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                          title="Delete project"
                        >
                          🗑
                        </button>

                      </div>


                      {/* DESCRIPTION */}

                      <p
                        onClick={() =>
                          navigate(
                            `/projects/${encodeURIComponent(
                              project.id
                            )}`
                          )
                        }
                        className="mt-5 cursor-pointer text-sm leading-6 text-gray-500"
                      >
                        {project.description}
                      </p>


                      {/* STATUS */}

                      <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">

                        <span className="text-xs text-gray-600">
                          Status
                        </span>


                        <select
                          value={project.status}
                          onChange={(event) =>
                            updateStatus(
                              project,
                              event.target.value
                            )
                          }
                          className="cursor-pointer rounded-lg border border-white/[0.08] bg-[#151517] px-3 py-2 text-xs text-gray-400 outline-none transition hover:border-white/[0.15] hover:text-gray-200"
                        >

                          {statuses.map(
                            (status) => (

                              <option
                                key={status}
                                value={status}
                                className="bg-[#151517]"
                              >
                                {status}
                              </option>

                            )
                          )}

                        </select>

                      </div>


                      {/* OPEN */}

                      <div className="mt-4 flex items-center justify-between">

                        <span
                          onClick={() =>
                            navigate(
                              `/projects/${encodeURIComponent(
                                project.id
                              )}`
                            )
                          }
                          className="cursor-pointer text-xs text-gray-600 transition hover:text-gray-300"
                        >
                          Open workspace
                        </span>

                        <button
                          onClick={() =>
                            navigate(
                              `/projects/${encodeURIComponent(
                                project.id
                              )}`
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-sm text-gray-500 transition hover:bg-white/[0.06] hover:text-white"
                        >
                          →
                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </section>


          <div className="h-20" />

        </div>

      </div>


      {/* NEW PROJECT MODAL */}

      {showModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#111113] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="flex items-start justify-between">

              <div>

                <h2 className="text-xl font-semibold">
                  New Project
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Create a new project workspace.
                </p>

              </div>

              <button
                onClick={() => {
                  setProjectTitle("");
                  setShowModal(false);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.06] hover:text-white"
              >
                ×
              </button>

            </div>


            <div className="mt-6">

              <label className="text-sm text-gray-400">
                Project title
              </label>

              <input
                autoFocus
                type="text"
                value={projectTitle}
                onChange={(event) =>
                  setProjectTitle(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {

                  if (
                    event.key ===
                    "Enter"
                  ) {
                    createProject();
                  }

                }}
                placeholder="e.g. My New Project"
                className="mt-2 w-full rounded-xl border border-white/[0.08] bg-[#19191c] px-4 py-3 text-sm text-gray-200 outline-none placeholder:text-gray-600 focus:border-white/[0.2]"
              />

            </div>


            <div className="mt-6 flex justify-end gap-2">

              <button
                onClick={() => {
                  setProjectTitle("");
                  setShowModal(false);
                }}
                className="rounded-xl border border-white/[0.08] px-4 py-2.5 text-sm text-gray-500 transition hover:bg-white/[0.05] hover:text-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={createProject}
                disabled={
                  !projectTitle.trim() ||
                  creating
                }
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {creating
                  ? "Creating..."
                  : "Create Project"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}