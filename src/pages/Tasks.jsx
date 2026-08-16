import { useState } from "react";

const columns = ["todo", "progress", "done"];

const columnInfo = {
  todo: {
    title: "Todo",
    description: "Things that need to be done",
    dot: "bg-amber-400",
    glow: "shadow-[0_0_10px_rgba(251,191,36,0.5)]",
    border: "border-amber-400/25",
    bg: "bg-amber-400/[0.03]",
  },

  progress: {
    title: "In Progress",
    description: "Currently being worked on",
    dot: "bg-blue-400",
    glow: "shadow-[0_0_10px_rgba(96,165,250,0.5)]",
    border: "border-blue-400/25",
    bg: "bg-blue-400/[0.03]",
  },

  done: {
    title: "Done",
    description: "Completed work",
    dot: "bg-emerald-400",
    glow: "shadow-[0_0_10px_rgba(52,211,153,0.5)]",
    border: "border-emerald-400/25",
    bg: "bg-emerald-400/[0.03]",
  },
};

const initialTasks = {
  todo: [
    {
      id: 1,
      title: "Connect GitHub API",
      description: "Set up GitHub OAuth and repository fetching.",
      project: "Developer OS",
      priority: "High",
    },
    {
      id: 2,
      title: "Design Project Detail",
      description: "Create the detailed project workspace interface.",
      project: "Developer OS",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Update Documentation",
      description: "Add setup and architecture documentation.",
      project: "Work Wise",
      priority: "Low",
    },
    {
      id: 4,
      title: "Create Database Schema",
      description: "Design the database structure for projects and tasks.",
      project: "Developer OS",
      priority: "High",
    },
  ],

  progress: [
    {
      id: 5,
      title: "Finish Login API",
      description: "Complete authentication and session handling.",
      project: "Developer OS",
      priority: "High",
    },
    {
      id: 6,
      title: "Dashboard UI",
      description: "Finish the main Developer OS dashboard.",
      project: "Developer OS",
      priority: "Medium",
    },
    {
      id: 7,
      title: "Improve Segmentation Model",
      description: "Experiment with the lightweight Mamba architecture.",
      project: "RetinaMamba",
      priority: "High",
    },
  ],

  done: [
    {
      id: 8,
      title: "Setup Next.js",
      description: "Initialize the Developer OS frontend.",
      project: "Developer OS",
      priority: "High",
    },
    {
      id: 9,
      title: "Create Sidebar",
      description: "Build the shared navigation component.",
      project: "Developer OS",
      priority: "Medium",
    },
    {
      id: 10,
      title: "Create Dashboard",
      description: "Build the first Developer OS dashboard.",
      project: "Developer OS",
      priority: "High",
    },
  ],
};

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const [dragging, setDragging] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [dropIndex, setDropIndex] = useState(null);

  const [showNewTask, setShowNewTask] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    project: "Developer OS",
    priority: "Medium",
  });

  // ------------------------------------------------------------
  // Find a task
  // ------------------------------------------------------------

  function getTask(taskId) {
    for (const column of columns) {
      const task = tasks[column].find(
        (item) => item.id === taskId
      );

      if (task) {
        return {
          task,
          column,
        };
      }
    }

    return null;
  }

  // ------------------------------------------------------------
  // Drag start
  // ------------------------------------------------------------

  function handleDragStart(event, task, column) {
    event.dataTransfer.effectAllowed = "move";

    event.dataTransfer.setData(
      "text/plain",
      String(task.id)
    );

    setDragging({
      taskId: task.id,
      sourceColumn: column,
    });

    setDragOverColumn(column);

    setDropIndex(
      tasks[column].findIndex(
        (item) => item.id === task.id
      )
    );
  }

  // ------------------------------------------------------------
  // Drag over column
  // ------------------------------------------------------------

  function handleColumnDragOver(event, column) {
    event.preventDefault();

    if (!dragging) {
      return;
    }

    event.dataTransfer.dropEffect = "move";

    setDragOverColumn(column);

    if (tasks[column].length === 0) {
      setDropIndex(0);
    }
  }

  // ------------------------------------------------------------
  // Drag over card
  // ------------------------------------------------------------

  function handleCardDragOver(event, column, index) {
    event.preventDefault();
    event.stopPropagation();

    if (!dragging) {
      return;
    }

    event.dataTransfer.dropEffect = "move";

    setDragOverColumn(column);

    const rect =
      event.currentTarget.getBoundingClientRect();

    const middle =
      rect.top + rect.height / 2;

    if (event.clientY < middle) {
      setDropIndex(index);
    } else {
      setDropIndex(index + 1);
    }
  }

  // ------------------------------------------------------------
  // Drop
  // ------------------------------------------------------------

  function handleDrop(event, targetColumn) {
    event.preventDefault();
    event.stopPropagation();

    if (!dragging) {
      return;
    }

    const result = getTask(dragging.taskId);

    if (!result) {
      resetDrag();
      return;
    }

    const task = result.task;
    const sourceColumn = dragging.sourceColumn;

    setTasks((current) => {
      const next = {
        todo: [...current.todo],
        progress: [...current.progress],
        done: [...current.done],
      };

      const originalIndex =
        next[sourceColumn].findIndex(
          (item) => item.id === dragging.taskId
        );

      next[sourceColumn] =
        next[sourceColumn].filter(
          (item) => item.id !== dragging.taskId
        );

      let index =
        dropIndex === null
          ? next[targetColumn].length
          : dropIndex;

      if (
        sourceColumn === targetColumn &&
        originalIndex < index
      ) {
        index -= 1;
      }

      index = Math.max(
        0,
        Math.min(
          index,
          next[targetColumn].length
        )
      );

      next[targetColumn].splice(
        index,
        0,
        task
      );

      return next;
    });

    resetDrag();
  }

  // ------------------------------------------------------------
  // Drag end
  // ------------------------------------------------------------

  function resetDrag() {
    setDragging(null);
    setDragOverColumn(null);
    setDropIndex(null);
  }

  // ------------------------------------------------------------
  // Create task
  // ------------------------------------------------------------

  function createTask() {
    if (!newTask.title.trim()) {
      return;
    }

    const task = {
      id: Date.now(),
      title: newTask.title.trim(),
      description:
        newTask.description.trim() ||
        "No description added.",
      project: newTask.project,
      priority: newTask.priority,
    };

    setTasks((current) => ({
      ...current,
      todo: [...current.todo, task],
    }));

    setNewTask({
      title: "",
      description: "",
      project: "Developer OS",
      priority: "Medium",
    });

    setShowNewTask(false);
  }

  // ------------------------------------------------------------
  // Priority styling
  // ------------------------------------------------------------

  function priorityClass(priority) {
    if (priority === "High") {
      return "border-red-400/30 bg-red-400/[0.09] text-red-300";
    }

    if (priority === "Medium") {
      return "border-amber-400/30 bg-amber-400/[0.09] text-amber-300";
    }

    return "border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-300";
  }

  return (
    <div className="min-h-screen">

      <div className="px-6 py-10 md:px-10">

        <div className="mx-auto max-w-[1600px]">

          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="text-sm text-gray-500">
                Workspace
              </p>

              <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                Tasks
              </h1>

              <p className="mt-3 text-gray-500">
                Organize your work and keep things moving.
              </p>

            </div>

            <button
              onClick={() => setShowNewTask(true)}
              className="group w-fit rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)]"
            >
              <span className="mr-1 inline-block transition-transform duration-200 group-hover:rotate-90">
                +
              </span>

              New Task
            </button>

          </div>


          {/* ==================================================
              BOARD
          ================================================== */}

          <div className="grid gap-5 lg:grid-cols-3">

            {columns.map((column) => {

              const info = columnInfo[column];
              const columnTasks = tasks[column];

              const isTarget =
                dragOverColumn === column;

              return (
                <section
                  key={column}
                  onDragOver={(event) =>
                    handleColumnDragOver(
                      event,
                      column
                    )
                  }
                  onDrop={(event) =>
                    handleDrop(
                      event,
                      column
                    )
                  }
                  className={`
                    min-h-[650px]
                    rounded-3xl
                    border
                    p-4
                    backdrop-blur-xl
                    transition-all
                    duration-300

                    ${
                      isTarget
                        ? `${info.border} ${info.bg} shadow-[0_0_50px_rgba(255,255,255,0.04)]`
                        : "border-white/[0.08] bg-[#111113]/95 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                    }
                  `}
                >

                  {/* COLUMN HEADER */}

                  <div className="mb-5 px-2">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <span
                          className={`
                            h-2
                            w-2
                            rounded-full
                            ${info.dot}
                            ${info.glow}
                            transition-transform
                            duration-300

                            ${
                              isTarget
                                ? "scale-150"
                                : ""
                            }
                          `}
                        />

                        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                          {info.title}
                        </h2>

                        <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2 text-xs text-gray-500">
                          {columnTasks.length}
                        </span>

                      </div>

                      <button
                        onClick={() =>
                          setShowNewTask(true)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-600 transition-all duration-200 hover:rotate-90 hover:bg-white/[0.06] hover:text-gray-300"
                      >
                        +
                      </button>

                    </div>

                    <p className="mt-1 text-xs text-gray-600">
                      {info.description}
                    </p>

                  </div>


                  {/* TASKS */}

                  <div className="min-h-[540px] space-y-3">

                    {columnTasks.map(
                      (task, index) => {

                        const showPlaceholder =
                          dragging !== null &&
                          dragOverColumn === column &&
                          dropIndex === index &&
                          dragging.taskId !== task.id;

                        const isDragging =
                          dragging?.taskId === task.id;

                        return (
                          <div key={task.id}>

                            {/* DROP PLACEHOLDER */}

                            {showPlaceholder && (
                              <div
                                className={`
                                  mb-3
                                  flex
                                  h-[120px]
                                  items-center
                                  justify-center
                                  rounded-2xl
                                  border
                                  border-dashed
                                  ${info.border}
                                  ${info.bg}
                                `}
                              >
                                <div className="flex items-center gap-2">

                                  <span
                                    className={`
                                      h-1.5
                                      w-1.5
                                      rounded-full
                                      ${info.dot}
                                      ${info.glow}
                                    `}
                                  />

                                  <span className="text-xs text-gray-600">
                                    Drop here
                                  </span>

                                </div>
                              </div>
                            )}


                            {/* TASK CARD */}

                            <div
                              draggable
                              onDragStart={(event) =>
                                handleDragStart(
                                  event,
                                  task,
                                  column
                                )
                              }
                              onDragOver={(event) =>
                                handleCardDragOver(
                                  event,
                                  column,
                                  index
                                )
                              }
                              onDragEnd={resetDrag}
                              className={`
                                group
                                rounded-2xl
                                border
                                border-white/[0.08]
                                bg-[#18181b]
                                p-5
                                select-none
                                cursor-grab
                                shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                                transition-all
                                duration-200

                                hover:-translate-y-1
                                hover:border-white/[0.15]
                                hover:bg-[#1b1b1e]
                                hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]

                                active:cursor-grabbing

                                ${
                                  isDragging
                                    ? "relative z-50 scale-[1.025] -translate-y-1 border-white/[0.22] shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
                                    : ""
                                }
                              `}
                            >

                              {/* TITLE */}

                              <div className="flex items-start justify-between gap-3">

                                <div className="flex items-start gap-2.5">

                                  <span
                                    className={`
                                      mt-1.5
                                      h-1.5
                                      w-1.5
                                      shrink-0
                                      rounded-full
                                      ${info.dot}
                                      ${info.glow}
                                    `}
                                  />

                                  <h3 className="text-sm font-medium leading-5 text-gray-200">
                                    {task.title}
                                  </h3>

                                </div>

                                <button
                                  type="button"
                                  onPointerDown={(event) =>
                                    event.stopPropagation()
                                  }
                                  className="text-gray-700 opacity-0 transition group-hover:opacity-100 hover:text-gray-300"
                                >
                                  ⋯
                                </button>

                              </div>


                              {/* DESCRIPTION */}

                              <p className="mt-3 text-xs leading-5 text-gray-500">
                                {task.description}
                              </p>


                              {/* PROJECT */}

                              <div className="mt-4">

                                <span className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[11px] text-gray-500">
                                  {task.project}
                                </span>

                              </div>


                              {/* FOOTER */}

                              <div className="mt-5 flex items-center justify-between">

                                <span
                                  className={`
                                    rounded-full
                                    border
                                    px-3
                                    py-1
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-wider
                                    ${priorityClass(
                                      task.priority
                                    )}
                                  `}
                                >
                                  {task.priority}
                                </span>

                                <span className="text-[11px] text-gray-700 transition-colors group-hover:text-gray-500">
                                  Drag ↕
                                </span>

                              </div>

                            </div>

                          </div>
                        );
                      }
                    )}


                    {/* LAST DROP POSITION */}

                    {dragging !== null &&
                      dragOverColumn === column &&
                      dropIndex ===
                        columnTasks.length && (
                        <div
                          className={`
                            flex
                            h-[120px]
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-dashed
                            ${info.border}
                            ${info.bg}
                          `}
                        >
                          <div className="flex items-center gap-2">

                            <span
                              className={`
                                h-1.5
                                w-1.5
                                rounded-full
                                ${info.dot}
                                ${info.glow}
                              `}
                            />

                            <span className="text-xs text-gray-600">
                              Drop here
                            </span>

                          </div>
                        </div>
                      )}


                    {/* EMPTY */}

                    {columnTasks.length === 0 &&
                      dragging === null && (
                        <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01]">

                          <div className="text-center">

                            <span
                              className={`
                                mx-auto
                                mb-3
                                block
                                h-2
                                w-2
                                rounded-full
                                ${info.dot}
                                ${info.glow}
                              `}
                            />

                            <p className="text-xs text-gray-700">
                              Drop tasks here
                            </p>

                          </div>

                        </div>
                      )}

                  </div>

                </section>
              );
            })}

          </div>


          {/* HINT */}

          <div className="mt-5 flex justify-center">

            <p className="text-xs text-gray-700">
              Drag tasks to reorder them or move them between columns
            </p>

          </div>

          <div className="h-20" />

        </div>

      </div>


      {/* ======================================================
          NEW TASK MODAL
      ====================================================== */}

      {showNewTask && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-3xl border border-white/[0.10] bg-[#111113] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-semibold">
                  New Task
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  Add something to your workflow.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowNewTask(false)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-white/[0.06] hover:text-gray-300"
              >
                ×
              </button>

            </div>


            {/* TITLE */}

            <div className="mt-6">

              <label className="text-xs uppercase tracking-wider text-gray-600">
                Task
              </label>

              <input
                value={newTask.title}
                onChange={(event) =>
                  setNewTask({
                    ...newTask,
                    title: event.target.value,
                  })
                }
                placeholder="What needs to be done?"
                className="mt-2 w-full rounded-xl border border-white/[0.08] bg-[#18181b] px-4 py-3 text-sm text-gray-300 outline-none placeholder:text-gray-700 focus:border-white/[0.18]"
              />

            </div>


            {/* DESCRIPTION */}

            <div className="mt-5">

              <label className="text-xs uppercase tracking-wider text-gray-600">
                Description
              </label>

              <textarea
                value={newTask.description}
                onChange={(event) =>
                  setNewTask({
                    ...newTask,
                    description:
                      event.target.value,
                  })
                }
                placeholder="Add some details..."
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-white/[0.08] bg-[#18181b] px-4 py-3 text-sm text-gray-300 outline-none placeholder:text-gray-700 focus:border-white/[0.18]"
              />

            </div>


            {/* PROJECT / PRIORITY */}

            <div className="mt-5 grid grid-cols-2 gap-3">

              <div>

                <label className="text-xs uppercase tracking-wider text-gray-600">
                  Project
                </label>

                <select
                  value={newTask.project}
                  onChange={(event) =>
                    setNewTask({
                      ...newTask,
                      project: event.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-white/[0.08] bg-[#18181b] px-4 py-3 text-sm text-gray-400 outline-none"
                >
                  <option>Developer OS</option>
                  <option>KrishiMitra AI</option>
                  <option>RetinaMamba</option>
                  <option>Work Wise</option>
                </select>

              </div>


              <div>

                <label className="text-xs uppercase tracking-wider text-gray-600">
                  Priority
                </label>

                <select
                  value={newTask.priority}
                  onChange={(event) =>
                    setNewTask({
                      ...newTask,
                      priority: event.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-white/[0.08] bg-[#18181b] px-4 py-3 text-sm text-gray-400 outline-none"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>

              </div>

            </div>


            {/* BUTTONS */}

            <div className="mt-7 flex justify-end gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowNewTask(false)
                }
                className="rounded-xl border border-white/[0.08] px-5 py-2.5 text-sm text-gray-500 transition hover:bg-white/[0.04] hover:text-gray-300"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={createTask}
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-gray-200"
              >
                Create Task
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}