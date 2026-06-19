from sqlalchemy import Column, Integer, String, Float, Boolean, Text, Enum
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class ProductCategory(str, enum.Enum):
    SPICES      = "spices"
    LENTILS     = "lentils"
    RICE_GRAINS = "rice_grains"
    FLOUR       = "flour"
    OILS        = "oils"
    PICKLES     = "pickles"
    SNACKS      = "snacks"
    BEVERAGES   = "beverages"
    FROZEN      = "frozen"
    DAIRY       = "dairy"
    FRESH_HERBS = "fresh_herbs"
    SWEETS      = "sweets"

class Product(Base):
    __tablename__ = "products"

    id             = Column(Integer, primary_key=True, index=True)
    name_en        = Column(String(150), nullable=False)
    name_ur        = Column(String(150))
    brand          = Column(String(100))
    category       = Column(Enum(ProductCategory), nullable=False)
    description    = Column(Text)
    price          = Column(Float, nullable=False)
    compare_price  = Column(Float)
    weight         = Column(String(30))
    stock_quantity = Column(Integer, default=0)
    is_available   = Column(Boolean, default=True)
    is_featured    = Column(Boolean, default=False)
    image_url      = Column(String(500))
    rating         = Column(Float, default=0.0)
    total_reviews  = Column(Integer, default=0)
    tags           = Column(Text)
    origin_country = Column(String(60))

    order_items = relationship("OrderItem", back_populates="product")
    cart_items  = relationship("CartItem",  back_populates="product")
