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

async def get_github_pull_requests(username: str):
    url = f"{GITHUB_API}/search/issues"

    params = {
        "q": f"author:{username} type:pr",
        "sort": "updated",
        "order": "desc",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)

    response.raise_for_status()

    data = response.json()

    return [
        {
            "title": pr["title"],
            "url": pr["html_url"],
            "state": pr["state"],
            "repository": pr["repository_url"].split("/")[-1],
            "created_at": pr["created_at"],
            "updated_at": pr["updated_at"],
        }
        for pr in data["items"]
    ]

async def get_github_stats(username: str):
    async with httpx.AsyncClient() as client:

        profile_url = f"{GITHUB_API}/users/{username}"
        profile_response = await client.get(profile_url)
        profile_response.raise_for_status()
        profile = profile_response.json()

        repos_url = f"{GITHUB_API}/users/{username}/repos"
        repos_response = await client.get(
            repos_url,
            params={"per_page": 100}
        )
        repos_response.raise_for_status()
        repositories = repos_response.json()

        prs_url = f"{GITHUB_API}/search/issues"
        prs_response = await client.get(
            prs_url,
            params={"q": f"author:{username} type:pr"}
        )
        prs_response.raise_for_status()
        prs_data = prs_response.json()

    total_stars = sum(
        repo["stargazers_count"]
        for repo in repositories
    )

    return {
        "repositories": profile["public_repos"],
        "stars": total_stars,
        "pull_requests": prs_data["total_count"],
    }

async def get_github_activity(username: str):
    url = f"{GITHUB_API}/users/{username}/events"

    async with httpx.AsyncClient() as client:
        response = await client.get(
            url,
            params={"per_page": 10}
        )

    response.raise_for_status()

    events = response.json()

    return [
        {
            "type": event["type"],
            "repo": event["repo"]["name"],
            "created_at": event["created_at"],
        }
        for event in events
    ]