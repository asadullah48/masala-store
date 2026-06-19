from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id              = Column(Integer, primary_key=True, index=True)
    full_name       = Column(String(100), nullable=False)
    email           = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    phone           = Column(String(20))
    address         = Column(String(250))
    city            = Column(String(60))
    postal_code     = Column(String(20))
    is_active       = Column(Boolean, default=True)
    loyalty_points  = Column(Float, default=0.0)
    created_at      = Column(DateTime, default=datetime.utcnow)

    orders     = relationship("Order",    back_populates="user")
    cart_items = relationship("CartItem", back_populates="user")
