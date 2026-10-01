import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

export default function ProjectExplorer() {

  const { projectId } = useParams();
  const navigate = useNavigate();

  const decodedProjectId = decodeURIComponent(projectId);

  const [tree, setTree] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showNewMenu, setShowNewMenu] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);

  const [inputType, setInputType] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const [error, setError] = useState("");

  // ---------------------------------------------------------
  // LOAD TREE
  // ---------------------------------------------------------

  const loadTree = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/projects/${encodeURIComponent(
          decodedProjectId
        )}/tree`
      );

      if (!response.ok) {
        throw new Error("Failed to load project");
      }

      const data = await response.json();

      setTree(data);

    } catch (error) {

      console.error(error);
      setError(error.message);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadTree();
  }, [decodedProjectId]);


  // ---------------------------------------------------------
  // OPEN FILE
  // ---------------------------------------------------------

  const openFile = async (file) => {

    try {

      setError("");

      const response = await fetch(
        `${API_URL}/projects/${encodeURIComponent(
          decodedProjectId
        )}/files/${file.path
          .split("/")
          .map(encodeURIComponent)
          .join("/")}`
      );

      if (!response.ok) {
        throw new Error("Failed to open file");
      }

      const data = await response.json();

      setSelectedFile(file);
      setFileContent(data.content);

    } catch (error) {

      console.error(error);
      setError(error.message);

    }
  };


  // ---------------------------------------------------------
  // SAVE FILE
  // ---------------------------------------------------------

  const saveFile = async () => {

    if (!selectedFile) return;

    try {

      setSaving(true);
      setError("");

      const response = await fetch(
        `${API_URL}/projects/${encodeURIComponent(
          decodedProjectId
        )}/files/${selectedFile.path
          .split("/")
          .map(encodeURIComponent)
          .join("/")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: fileContent,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.detail || "Failed to save file"
        );
      }

    } catch (error) {

      console.error(error);
      setError(error.message);

    } finally {

      setSaving(false);

    }
  };


  // ---------------------------------------------------------
  // CREATE FOLDER / FILE
  // ---------------------------------------------------------

  const openCreateModal = (type) => {

    setInputType(type);
    setInputValue("");
    setShowInputModal(true);
    setShowNewMenu(false);

  };


  const createItem = async () => {

    const value = inputValue.trim();

    if (!value) return;

    try {

      setError("");

      if (inputType === "folder") {

        await fetch(
          `${API_URL}/projects/${encodeURIComponent(
            decodedProjectId
          )}/folders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              path: value,
            }),
          }
        );

      } else {

        let fileName = value;

        if (!fileName.toLowerCase().endsWith(".txt")) {
          fileName += ".txt";
        }

        await fetch(
          `${API_URL}/projects/${encodeURIComponent(
            decodedProjectId
          )}/files`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              path: fileName,
              content: "",
            }),
          }
        );
      }

      setShowInputModal(false);
      setInputValue("");

      await loadTree();

    } catch (error) {

      console.error(error);
      setError(error.message);

    }
  };


  // ---------------------------------------------------------
  // DELETE FILE
  // ---------------------------------------------------------

  const deleteFile = async () => {

    if (!selectedFile) return;

    const confirmed = window.confirm(
      `Delete ${selectedFile.name}?`
    );

    if (!confirmed) return;

    try {

      const response = await fetch(
        `${API_URL}/projects/${encodeURIComponent(
          decodedProjectId
        )}/files/${selectedFile.path
          .split("/")
          .map(encodeURIComponent)
          .join("/")}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      setSelectedFile(null);
      setFileContent("");

      await loadTree();

    } catch (error) {

      console.error(error);
      setError(error.message);

    }
  };


  // ---------------------------------------------------------
  // TREE RENDERER
  // ---------------------------------------------------------

  const renderTree = (items, depth = 0) => {

    return items.map((item) => (

      <div key={item.path}>

        <div
          onClick={() => {
            if (item.type === "file") {
              openFile(item);
            }
          }}
          className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-white/[0.05] ${
            selectedFile?.path === item.path
              ? "bg-white/[0.08] text-white"
              : "text-gray-400"
          }`}
          style={{
            paddingLeft: `${12 + depth * 18}px`,
          }}
        >

          <span className="text-xs">
            {item.type === "folder"
              ? "📁"
              : "📄"}
          </span>

          <span className="truncate">
            {item.name}
          </span>

        </div>

        {item.type === "folder" &&
          item.children?.length > 0 && (
            <div>
              {renderTree(
                item.children,
                depth + 1
              )}
            </div>
          )}

      </div>

    ));
  };


  // ---------------------------------------------------------
  // LOADING
  // ---------------------------------------------------------

  if (loading) {

    return (
      <div className="min-h-screen p-10 text-gray-500">
        Loading project...
      </div>
    );

  }


  return (
    <div className="min-h-screen">

      <div className="px-6 py-8 md:px-10">

        <div className="mx-auto max-w-7xl">

          {/* HEADER */}

          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>

              <button
                onClick={() => navigate("/projects")}
                className="mb-3 text-sm text-gray-600 transition hover:text-gray-300"
              >
                ← Projects
              </button>

              <h1 className="text-3xl font-semibold tracking-tight">
                {decodedProjectId}
              </h1>

              <p className="mt-1 text-sm text-gray-600">
                Project workspace
              </p>

            </div>


            {/* NEW */}

            <div className="relative">

              <button
                onClick={() =>
                  setShowNewMenu(
                    !showNewMenu
                  )
                }
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                + New
              </button>


              {showNewMenu && (

                <div className="absolute right-0 top-12 z-20 w-44 rounded-xl border border-white/[0.08] bg-[#151517] p-1.5 shadow-2xl">

                  <button
                    onClick={() =>
                      openCreateModal("folder")
                    }
                    className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm text-gray-400 hover:bg-white/[0.06] hover:text-white"
                  >
                    📁 New Folder
                  </button>

                  <button
                    onClick={() =>
                      openCreateModal("file")
                    }
                    className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm text-gray-400 hover:bg-white/[0.06] hover:text-white"
                  >
                    📄 New Text File
                  </button>

                </div>

              )}

            </div>

          </div>


          {/* ERROR */}

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}


          {/* EXPLORER */}

          <div className="grid min-h-[650px] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111113]/95 shadow-[0_20px_60px_rgba(0,0,0,0.35)] lg:grid-cols-[280px_1fr]">

            {/* SIDEBAR */}

            <div className="border-b border-white/[0.06] p-4 lg:border-b-0 lg:border-r">

              <div className="mb-4 px-2">

                <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                  Explorer
                </p>

              </div>


              <div>

                {tree?.children?.length > 0 ? (

                  renderTree(tree.children)

                ) : (

                  <p className="px-2 text-sm text-gray-600">
                    Empty project
                  </p>

                )}

              </div>

            </div>


            {/* EDITOR */}

            <div className="flex min-h-[650px] flex-col">

              {selectedFile ? (

                <>

                  {/* FILE HEADER */}

                  <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">

                    <div className="flex items-center gap-3">

                      <span className="text-sm">
                        📄
                      </span>

                      <div>

                        <p className="text-sm font-medium text-gray-300">
                          {selectedFile.name}
                        </p>

                        <p className="text-xs text-gray-600">
                          {selectedFile.path}
                        </p>

                      </div>

                    </div>


                    <div className="flex gap-2">

                      <button
                        onClick={deleteFile}
                        className="rounded-lg border border-red-500/10 px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>

                      <button
                        onClick={saveFile}
                        disabled={saving}
                        className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
                      >
                        {saving
                          ? "Saving..."
                          : "Save"}
                      </button>

                    </div>

                  </div>


                  {/* EDITOR */}

                  <textarea
                    value={fileContent}
                    onChange={(event) =>
                      setFileContent(
                        event.target.value
                      )
                    }
                    spellCheck={false}
                    className="min-h-[560px] flex-1 resize-none bg-transparent p-6 font-mono text-sm leading-7 text-gray-300 outline-none placeholder:text-gray-700"
                    placeholder="Start writing..."
                  />

                </>

              ) : (

                <div className="flex flex-1 items-center justify-center">

                  <div className="text-center">

                    <div className="mb-4 text-4xl">
                      📄
                    </div>

                    <h2 className="text-lg font-semibold">
                      Select a file
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                      Choose a text file from the explorer to edit it.
                    </p>

                  </div>

                </div>

              )}

            </div>

          </div>

          <div className="h-10" />

        </div>

      </div>


      {/* CREATE MODAL */}

      {showInputModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={() =>
            setShowInputModal(false)
          }
        >

          <div
            className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#111113] p-6 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <h2 className="text-xl font-semibold">
              {inputType === "folder"
                ? "New Folder"
                : "New Text File"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {inputType === "folder"
                ? "Create a folder inside this project."
                : "Create a new .txt documentation file."}
            </p>


            <input
              autoFocus
              value={inputValue}
              onChange={(event) =>
                setInputValue(
                  event.target.value
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  createItem();
                }
              }}
              placeholder={
                inputType === "folder"
                  ? "e.g. Backend"
                  : "e.g. API.txt"
              }
              className="mt-6 w-full rounded-xl border border-white/[0.08] bg-[#19191c] px-4 py-3 text-sm text-gray-200 outline-none placeholder:text-gray-600 focus:border-white/[0.2]"
            />


            <div className="mt-6 flex justify-end gap-2">

              <button
                onClick={() =>
                  setShowInputModal(false)
                }
                className="rounded-xl border border-white/[0.08] px-4 py-2.5 text-sm text-gray-500 hover:bg-white/[0.05]"
              >
                Cancel
              </button>

              <button
                onClick={createItem}
                disabled={!inputValue.trim()}
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-gray-200 disabled:opacity-40"
              >
                Create
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}