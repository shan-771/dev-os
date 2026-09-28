from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.github import router as github_router

app = FastAPI(title="Developer OS API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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