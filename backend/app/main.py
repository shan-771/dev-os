from fastapi import FastAPI
from app.routes.github import router as github_router

app = FastAPI(title="Developer OS API")

app.include_router(github_router)


@app.get("/")
def root():
    return {
        "message": "Developer OS API is running"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "ok"
    }