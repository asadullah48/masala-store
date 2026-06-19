from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.order import CartItem
from app.models.product import Product
from pydantic import BaseModel

router = APIRouter()

class AddToCartRequest(BaseModel):
    user_id:    int
    product_id: int
    quantity:   int = 1

@router.post("/add", status_code=201)
async def add_to_cart(payload: AddToCartRequest, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == payload.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    existing = db.query(CartItem).filter(
        CartItem.user_id == payload.user_id,
        CartItem.product_id == payload.product_id
    ).first()
    if existing:
        existing.quantity += payload.quantity
        db.commit()
        return existing
    item = CartItem(user_id=payload.user_id, product_id=payload.product_id, quantity=payload.quantity)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.get("/{user_id}")
async def get_cart(user_id: int, db: Session = Depends(get_db)):
    items = db.query(CartItem).filter(CartItem.user_id == user_id).all()
    total = sum(i.product.price * i.quantity for i in items if i.product)
    return {"items": items, "total": round(total, 2), "count": len(items)}

@router.delete("/{user_id}/item/{product_id}")
async def remove_from_cart(user_id: int, product_id: int, db: Session = Depends(get_db)):
    item = db.query(CartItem).filter(CartItem.user_id == user_id, CartItem.product_id == product_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not in cart")
    db.delete(item)
    db.commit()
    return {"message": "Item removed"}
