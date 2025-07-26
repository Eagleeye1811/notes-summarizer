from fastapi import FastAPI
from app.routes import summarizer

app = FastAPI(title="PDF Summarizer")

app.include_router(summarizer.router, prefix="/api/summarize")
