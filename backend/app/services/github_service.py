import httpx


GITHUB_API = "https://api.github.com"


async def get_github_profile(username: str):
    url = f"{GITHUB_API}/users/{username}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)

    response.raise_for_status()

    data = response.json()

    return {
        "username": data["login"],
        "name": data["name"],
        "avatar_url": data["avatar_url"],
        "bio": data["bio"],
        "public_repos": data["public_repos"],
        "followers": data["followers"],
        "following": data["following"],
    }

async def get_github_repositories(username: str):
    url = f"{GITHUB_API}/users/{username}/repos"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)

    response.raise_for_status()

    repositories = response.json()

    return [
        {
            "name": repo["name"],
            "description": repo["description"],
            "language": repo["language"],
            "stars": repo["stargazers_count"],
            "forks": repo["forks_count"],
            "url": repo["html_url"],
            "visibility": repo["visibility"],
            "updated_at": repo["updated_at"],
        }
        for repo in repositories
    ]