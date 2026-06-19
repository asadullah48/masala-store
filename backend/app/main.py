from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Masala Store API",
    description="South Asian Grocery and Spice Platform - Canadian Markets",
    version="1.0.0",
    docs_url="/docs",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "ok", "service": "Masala Store API", "version": "1.0.0"}

@app.get("/health")
async def health():
    return {"status": "healthy"}
