from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import stripe
from app.core.config import settings

stripe.api_key = settings.STRIPE_SECRET_KEY
router = APIRouter()

class PaymentIntentRequest(BaseModel):
    amount:   float
    currency: str = "cad"
    order_id: int

@router.post("/intent")
async def create_payment_intent(payload: PaymentIntentRequest):
    try:
        intent = stripe.PaymentIntent.create(
            amount=int(payload.amount * 100),
            currency=payload.currency,
            metadata={"order_id": payload.order_id},
        )
        return {"client_secret": intent.client_secret, "payment_intent_id": intent.id}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))
