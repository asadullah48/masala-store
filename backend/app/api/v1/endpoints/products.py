from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.models.product import Product, ProductCategory

router = APIRouter()

@router.get("/")
async def list_products(
    category:  Optional[ProductCategory] = Query(None),
    search:    Optional[str]             = Query(None),
    featured:  Optional[bool]            = Query(None),
    min_price: Optional[float]           = Query(None),
    max_price: Optional[float]           = Query(None),
    page:      int                       = Query(1, ge=1),
    limit:     int                       = Query(20, ge=1, le=100),
    db:        Session                   = Depends(get_db),
):
    query = db.query(Product).filter(Product.is_available == True)
    if category:
        query = query.filter(Product.category == category)
    if search:
        query = query.filter(
            Product.name_en.ilike(f"%{search}%") |
            Product.name_ur.ilike(f"%{search}%") |
            Product.brand.ilike(f"%{search}%")
        )
    if featured is not None:
        query = query.filter(Product.is_featured == featured)
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)
    total    = query.count()
    products = query.offset((page - 1) * limit).limit(limit).all()
    return {"total": total, "page": page, "limit": limit, "products": products}

@router.get("/{product_id}")
async def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
