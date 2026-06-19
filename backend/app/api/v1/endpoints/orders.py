from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.order import Order, OrderItem, OrderStatus, CartItem
from app.models.product import Product
from pydantic import BaseModel

router = APIRouter()

class PlaceOrderRequest(BaseModel):
    user_id:          int
    delivery_address: str
    delivery_city:    str
    postal_code:      str
    notes:            str = None

@router.post("/", status_code=201)
async def place_order(payload: PlaceOrderRequest, db: Session = Depends(get_db)):
    cart_items = db.query(CartItem).filter(CartItem.user_id == payload.user_id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    total = sum(i.product.price * i.quantity for i in cart_items if i.product)
    order = Order(
        user_id=payload.user_id,
        total_amount=round(total, 2),
        delivery_address=payload.delivery_address,
        delivery_city=payload.delivery_city,
        postal_code=payload.postal_code,
        notes=payload.notes,
    )
    db.add(order)
    db.flush()
    for item in cart_items:
        db.add(OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            unit_price=item.product.price,
            subtotal=round(item.product.price * item.quantity, 2),
        ))
        db.delete(item)
    db.commit()
    db.refresh(order)
    return order

@router.get("/{order_id}")
async def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.get("/user/{user_id}")
async def get_user_orders(user_id: int, db: Session = Depends(get_db)):
    orders = db.query(Order).filter(Order.user_id == user_id).order_by(Order.created_at.desc()).all()
    return {"orders": orders, "total": len(orders)}
