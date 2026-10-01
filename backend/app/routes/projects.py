from pathlib import Path
import re
import shutil

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"]
)


# ---------------------------------------------------------
# STORAGE
# ---------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[3]
PROJECTS_DIR = BASE_DIR / "data" / "projects"

PROJECTS_DIR.mkdir(parents=True, exist_ok=True)


# Temporary metadata
project_metadata = {}


# ---------------------------------------------------------
# SCHEMAS
# ---------------------------------------------------------

class ProjectCreate(BaseModel):
    name: str


class ProjectStatusUpdate(BaseModel):
    status: str


class FolderCreate(BaseModel):
    path: str


class FileCreate(BaseModel):
    path: str
    content: str = ""


class RenameRequest(BaseModel):
    new_name: str


class FileUpdate(BaseModel):
    content: str


# ---------------------------------------------------------
# HELPERS
# ---------------------------------------------------------

VALID_STATUSES = {
    "Active",
    "In Progress",
    "On Hold",
    "Completed",
}


def clean_name(name: str) -> str:

    name = name.strip()

    name = re.sub(
        r'[<>:"/\\|?*]',
        "",
        name
    )

    name = name.rstrip(". ")

    if not name:
        raise HTTPException(
            status_code=400,
            detail="Invalid name"
        )

    return name


def get_project_dir(project_id: str) -> Path:

    project_id = project_id.strip()

    if not project_id:
        raise HTTPException(
            status_code=400,
            detail="Invalid project"
        )

    project_dir = (
        PROJECTS_DIR / project_id
    ).resolve()

    try:
        project_dir.relative_to(
            PROJECTS_DIR.resolve()
        )
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid project path"
        )

    if not project_dir.exists():
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    if not project_dir.is_dir():
        raise HTTPException(
            status_code=400,
            detail="Invalid project"
        )

    return project_dir


def get_safe_path(
    project_dir: Path,
    relative_path: str
) -> Path:

    relative_path = relative_path.strip()

    if not relative_path:
        raise HTTPException(
            status_code=400,
            detail="Path cannot be empty"
        )

    target = (
        project_dir / relative_path
    ).resolve()

    try:
        target.relative_to(
            project_dir.resolve()
        )
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid path"
        )

    return target


def get_project_response(
    project_dir: Path
):

    project_id = project_dir.name

    metadata = project_metadata.get(
        project_id,
        {}
    )

    return {
        "id": project_id,
        "name": project_id,
        "description": metadata.get(
            "description",
            "Developer workspace"
        ),
        "status": metadata.get(
            "status",
            "Active"
        ),
    }


def build_tree(
    directory: Path,
    root: Path
):

    items = []

    try:

        children = sorted(
            directory.iterdir(),
            key=lambda item: (
                not item.is_dir(),
                item.name.lower()
            )
        )

    except OSError:

        return items

    for item in children:

        relative_path = (
            item.relative_to(root)
            .as_posix()
        )

        if item.is_dir():

            items.append({
                "name": item.name,
                "type": "folder",
                "path": relative_path,
                "children": build_tree(
                    item,
                    root
                )
            })

        elif item.is_file():

            if item.suffix.lower() == ".txt":

                items.append({
                    "name": item.name,
                    "type": "file",
                    "path": relative_path
                })

    return items


# ---------------------------------------------------------
# PROJECTS
# ---------------------------------------------------------

@router.get("")
def get_projects():

    projects = []

    for item in sorted(
        PROJECTS_DIR.iterdir(),
        key=lambda p: p.name.lower()
    ):

        if item.is_dir():

            projects.append(
                get_project_response(item)
            )

    return projects


@router.post("", status_code=201)
def create_project(
    project: ProjectCreate
):

    name = clean_name(project.name)

    project_dir = (
        PROJECTS_DIR / name
    )

    if project_dir.exists():

        raise HTTPException(
            status_code=409,
            detail="A project with this name already exists"
        )

    project_dir.mkdir(
        parents=True
    )

    readme = (
        project_dir / "README.txt"
    )

    readme.write_text(
        f"# {name}\n\n"
        f"Project documentation.\n",
        encoding="utf-8"
    )

    project_metadata[name] = {
        "status": "Active",
        "description": "Developer workspace",
    }

    return get_project_response(
        project_dir
    )


@router.get("/{project_id}")
def get_project(
    project_id: str
):

    project_dir = get_project_dir(
        project_id
    )

    return get_project_response(
        project_dir
    )


# ---------------------------------------------------------
# UPDATE PROJECT STATUS
# ---------------------------------------------------------

@router.patch("/{project_id}/status")
def update_project_status(
    project_id: str,
    data: ProjectStatusUpdate
):

    project_dir = get_project_dir(
        project_id
    )

    if data.status not in VALID_STATUSES:

        raise HTTPException(
            status_code=400,
            detail=(
                "Invalid status. "
                f"Allowed: {', '.join(VALID_STATUSES)}"
            )
        )

    project_metadata.setdefault(
        project_dir.name,
        {}
    )

    project_metadata[
        project_dir.name
    ]["status"] = data.status

    return get_project_response(
        project_dir
    )


# ---------------------------------------------------------
# DELETE PROJECT
# ---------------------------------------------------------

@router.delete("/{project_id}")
def delete_project(
    project_id: str
):

    project_dir = get_project_dir(
        project_id
    )

    shutil.rmtree(
        project_dir
    )

    project_metadata.pop(
        project_id,
        None
    )

    return {
        "message": "Project deleted"
    }


# ---------------------------------------------------------
# PROJECT TREE
# ---------------------------------------------------------

@router.get("/{project_id}/tree")
def get_project_tree(
    project_id: str
):

    project_dir = get_project_dir(
        project_id
    )

    return {
        "name": project_dir.name,
        "type": "folder",
        "path": "",
        "children": build_tree(
            project_dir,
            project_dir
        )
    }


# ---------------------------------------------------------
# CREATE FOLDER
# ---------------------------------------------------------

@router.post("/{project_id}/folders")
def create_folder(
    project_id: str,
    folder: FolderCreate
):

    project_dir = get_project_dir(
        project_id
    )

    folder_path = get_safe_path(
        project_dir,
        folder.path
    )

    if folder_path.exists():

        raise HTTPException(
            status_code=409,
            detail="Folder already exists"
        )

    folder_path.mkdir(
        parents=True,
        exist_ok=False
    )

    return {
        "message": "Folder created",
        "path": folder_path.relative_to(
            project_dir
        ).as_posix()
    }


# ---------------------------------------------------------
# DELETE FOLDER
# ---------------------------------------------------------

@router.delete(
    "/{project_id}/folders/{folder_path:path}"
)
def delete_folder(
    project_id: str,
    folder_path: str
):

    project_dir = get_project_dir(
        project_id
    )

    target = get_safe_path(
        project_dir,
        folder_path
    )

    if not target.exists():

        raise HTTPException(
            status_code=404,
            detail="Folder not found"
        )

    if not target.is_dir():

        raise HTTPException(
            status_code=400,
            detail="Path is not a folder"
        )

    shutil.rmtree(target)

    return {
        "message": "Folder deleted"
    }


# ---------------------------------------------------------
# CREATE FILE
# ---------------------------------------------------------

@router.post("/{project_id}/files")
def create_file(
    project_id: str,
    file: FileCreate
):

    project_dir = get_project_dir(
        project_id
    )

    file_path = get_safe_path(
        project_dir,
        file.path
    )

    if file_path.suffix.lower() != ".txt":

        raise HTTPException(
            status_code=400,
            detail="Only .txt files are allowed"
        )

    if file_path.exists():

        raise HTTPException(
            status_code=409,
            detail="File already exists"
        )

    file_path.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    file_path.write_text(
        file.content,
        encoding="utf-8"
    )

    return {
        "message": "File created",
        "path": file_path.relative_to(
            project_dir
        ).as_posix()
    }


# ---------------------------------------------------------
# READ FILE
# ---------------------------------------------------------

@router.get(
    "/{project_id}/files/{file_path:path}"
)
def read_file(
    project_id: str,
    file_path: str
):

    project_dir = get_project_dir(
        project_id
    )

    target = get_safe_path(
        project_dir,
        file_path
    )

    if not target.exists():

        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    if not target.is_file():

        raise HTTPException(
            status_code=400,
            detail="Path is not a file"
        )

    if target.suffix.lower() != ".txt":

        raise HTTPException(
            status_code=400,
            detail="Only .txt files are supported"
        )

    try:

        content = target.read_text(
            encoding="utf-8"
        )

    except UnicodeDecodeError:

        raise HTTPException(
            status_code=400,
            detail="File is not valid UTF-8 text"
        )

    return {
        "name": target.name,
        "path": target.relative_to(
            project_dir
        ).as_posix(),
        "content": content
    }


# ---------------------------------------------------------
# UPDATE FILE
# ---------------------------------------------------------

@router.put(
    "/{project_id}/files/{file_path:path}"
)
def update_file(
    project_id: str,
    file_path: str,
    file: FileUpdate
):

    project_dir = get_project_dir(
        project_id
    )

    target = get_safe_path(
        project_dir,
        file_path
    )

    if not target.exists():

        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    if not target.is_file():

        raise HTTPException(
            status_code=400,
            detail="Path is not a file"
        )

    target.write_text(
        file.content,
        encoding="utf-8"
    )

    return {
        "message": "File saved"
    }


# ---------------------------------------------------------
# DELETE FILE
# ---------------------------------------------------------

@router.delete(
    "/{project_id}/files/{file_path:path}"
)
def delete_file(
    project_id: str,
    file_path: str
):

    project_dir = get_project_dir(
        project_id
    )

    target = get_safe_path(
        project_dir,
        file_path
    )

    if not target.exists():

        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    if not target.is_file():

        raise HTTPException(
            status_code=400,
            detail="Path is not a file"
        )

    target.unlink()

    return {
        "message": "File deleted"
    }


# ---------------------------------------------------------
# RENAME FILE
# ---------------------------------------------------------

@router.patch(
    "/{project_id}/files/{file_path:path}"
)
def rename_file(
    project_id: str,
    file_path: str,
    rename: RenameRequest
):

    project_dir = get_project_dir(
        project_id
    )

    target = get_safe_path(
        project_dir,
        file_path
    )

    if not target.exists():

        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    if not target.is_file():

        raise HTTPException(
            status_code=400,
            detail="Path is not a file"
        )

    new_name = clean_name(
        rename.new_name
    )

    if not new_name.lower().endswith(".txt"):
        new_name += ".txt"

    new_path = (
        target.parent / new_name
    )

    if new_path.exists():

        raise HTTPException(
            status_code=409,
            detail="A file with that name already exists"
        )

    target.rename(new_path)

    return {
        "message": "File renamed",
        "path": new_path.relative_to(
            project_dir
        ).as_posix()
    }


# ---------------------------------------------------------
# RENAME FOLDER
# ---------------------------------------------------------

@router.patch(
    "/{project_id}/folders/{folder_path:path}"
)
def rename_folder(
    project_id: str,
    folder_path: str,
    rename: RenameRequest
):

    project_dir = get_project_dir(
        project_id
    )

    target = get_safe_path(
        project_dir,
        folder_path
    )

    if not target.exists():

        raise HTTPException(
            status_code=404,
            detail="Folder not found"
        )

    if not target.is_dir():

        raise HTTPException(
            status_code=400,
            detail="Path is not a folder"
        )

    new_name = clean_name(
        rename.new_name
    )

    new_path = (
        target.parent / new_name
    )

    if new_path.exists():

        raise HTTPException(
            status_code=409,
            detail="A folder with that name already exists"
        )

    target.rename(new_path)

    return {
        "message": "Folder renamed",
        "path": new_path.relative_to(
            project_dir
        ).as_posix()
    }