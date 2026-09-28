from fastapi import APIRouter

from app.services.github_service import (
    get_github_profile,
    get_github_repositories,
    get_github_pull_requests,
)

router = APIRouter(prefix="/api/github", tags=["GitHub"])


@router.get("/profile/{username}")
async def github_profile(username: str):
    return await get_github_profile(username)


@router.get("/repos/{username}")
async def github_repositories(username: str):
    return await get_github_repositories(username)

@router.get("/pulls/{username}")
async def github_pull_requests(username: str):
    return await get_github_pull_requests(username)