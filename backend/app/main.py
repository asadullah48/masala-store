from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import auth, products, cart, orders, payments, users

app = FastAPI(
    title="Masala Store API",
    description="South Asian Grocery and Spice Platform - Canadian Markets",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,     prefix="/api/v1/auth",     tags=["Authentication"])
app.include_router(products.router, prefix="/api/v1/products", tags=["Products"])
app.include_router(cart.router,     prefix="/api/v1/cart",     tags=["Cart"])
app.include_router(orders.router,   prefix="/api/v1/orders",   tags=["Orders"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["Payments"])
app.include_router(users.router,    prefix="/api/v1/users",    tags=["Users"])

@app.get("/", tags=["Health"])
async def root():
    return {"status": "ok", "service": "Masala Store API", "version": "1.0.0"}

@app.get("/health", tags=["Health"])
async def health():
    return {"status": "healthy"}
