from sqlalchemy import Column, Integer, String, Float, Enum, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime
import enum

class OrderStatus(str, enum.Enum):
    PENDING    = "pending"
    CONFIRMED  = "confirmed"
    PROCESSING = "processing"
    SHIPPED    = "shipped"
    DELIVERED  = "delivered"
    CANCELLED  = "cancelled"

class Order(Base):
    __tablename__ = "orders"

    id                = Column(Integer, primary_key=True, index=True)
    user_id           = Column(Integer, ForeignKey("users.id"), nullable=False)
    status            = Column(Enum(OrderStatus), default=OrderStatus.PENDING)
    total_amount      = Column(Float, nullable=False)
    delivery_address  = Column(String(300), nullable=False)
    delivery_city     = Column(String(60), nullable=False)
    postal_code       = Column(String(20), nullable=False)
    stripe_payment_id = Column(String(200))
    notes             = Column(Text)
    created_at        = Column(DateTime, default=datetime.utcnow)
    updated_at        = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user  = relationship("User",      back_populates="orders")
    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"

    id         = Column(Integer, primary_key=True, index=True)
    order_id   = Column(Integer, ForeignKey("orders.id"),   nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity   = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    subtotal   = Column(Float, nullable=False)

    order   = relationship("Order",   back_populates="items")
    product = relationship("Product", back_populates="order_items")

class CartItem(Base):
    __tablename__ = "cart_items"

    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id"),    nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity   = Column(Integer, default=1)

    user    = relationship("User",    back_populates="cart_items")
    product = relationship("Product", back_populates="cart_items")
