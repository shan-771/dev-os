import httpx
from app.cache import get_cache, set_cache


GITHUB_API = "https://api.github.com"


async def get_github_profile(username: str):

    cache_key = f"github_profile:{username}"

    cached = get_cache(cache_key)

    if cached is not None:
        return cached

    url = f"{GITHUB_API}/users/{username}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)

    response.raise_for_status()

    data = response.json()

    result = {
        "username": data["login"],
        "name": data["name"],
        "avatar_url": data["avatar_url"],
        "bio": data["bio"],
        "public_repos": data["public_repos"],
        "followers": data["followers"],
        "following": data["following"],
    }

    set_cache(cache_key, result)

    return result

async def get_github_repositories(username: str):

    cache_key = f"github_repositories:{username}"

    cached = get_cache(cache_key)

    if cached is not None:
        return cached

    url = f"{GITHUB_API}/users/{username}/repos"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)

    response.raise_for_status()

    repositories = response.json()

    result = [
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

    set_cache(cache_key, result)

    return result

async def get_github_pull_requests(username: str):

    cache_key = f"github_pull_requests:{username}"

    cached = get_cache(cache_key)

    if cached is not None:
        return cached

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

    result = [
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

    set_cache(cache_key, result)

    return result

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

    cache_key = f"github_activity:{username}"

    cached = get_cache(cache_key)

    if cached is not None:
        return cached

    url = f"{GITHUB_API}/users/{username}/events"

    async with httpx.AsyncClient() as client:
        response = await client.get(
            url,
            params={"per_page": 10}
        )

    response.raise_for_status()

    events = response.json()

    result = [
    {
        "type": event["type"],
        "repo": event["repo"]["name"],
        "created_at": event["created_at"],
    }
    for event in events
    ]

    set_cache(cache_key, result)

    return result

async def get_github_dashboard(username: str):

    cache_key = f"github_dashboard:{username}"

    cached = get_cache(cache_key)

    if cached is not None:
        print("CACHE HIT")
        return cached

    print("CACHE MISS - FETCHING FROM GITHUB")

    async with httpx.AsyncClient() as client:

        # Profile
        profile_response = await client.get(
            f"{GITHUB_API}/users/{username}"
        )
        profile_response.raise_for_status()
        profile_data = profile_response.json()

        profile = {
            "username": profile_data["login"],
            "name": profile_data["name"],
            "avatar_url": profile_data["avatar_url"],
            "bio": profile_data["bio"],
            "public_repos": profile_data["public_repos"],
            "followers": profile_data["followers"],
            "following": profile_data["following"],
        }

        # Repositories
        repos_response = await client.get(
            f"{GITHUB_API}/users/{username}/repos"
        )
        repos_response.raise_for_status()
        repositories_data = repos_response.json()

        repositories = [
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
            for repo in repositories_data
        ]

        # Pull requests
        prs_response = await client.get(
            f"{GITHUB_API}/search/issues",
            params={
                "q": f"author:{username} type:pr",
                "sort": "updated",
                "order": "desc",
            }
        )
        prs_response.raise_for_status()
        prs_data = prs_response.json()

        pull_requests = [
            {
                "title": pr["title"],
                "url": pr["html_url"],
                "state": pr["state"],
                "repository": pr["repository_url"].split("/")[-1],
                "created_at": pr["created_at"],
                "updated_at": pr["updated_at"],
            }
            for pr in prs_data["items"]
        ]

        # Activity
        activity_response = await client.get(
            f"{GITHUB_API}/users/{username}/events",
            params={"per_page": 10}
        )
        activity_response.raise_for_status()
        activity_data = activity_response.json()

        activity = [
            {
                "type": event["type"],
                "repo": event["repo"]["name"],
                "created_at": event["created_at"],
            }
            for event in activity_data
        ]

    total_stars = sum(
        repo["stars"]
        for repo in repositories
    )

    result = {
        "profile": profile,
        "stats": {
            "repositories": profile["public_repos"],
            "stars": total_stars,
            "pull_requests": prs_data["total_count"],
        },
        "repositories": repositories,
        "pull_requests": pull_requests,
        "activity": activity,
    }

    set_cache(cache_key, result)

    return result