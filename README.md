# 🌶️ Masala Store — South Asian Grocery & Spice Platform

![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi)
![React Native](https://img.shields.io/badge/React_Native-Expo-61DAFB?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-SQLAlchemy-336791?logo=postgresql)
![Status](https://img.shields.io/badge/status-early--stage_scaffold-orange)

An early-stage scaffold for a South Asian grocery/spice storefront: a
FastAPI backend with real product/cart/order/auth/payment endpoints, and
a React Native mobile UI in progress. **Not deployed anywhere yet** —
this section corrects an earlier README that claimed live iOS/Android/Web
apps and a five-city market presence; neither is accurate for what's in
this repo today.

## What's actually here

| Piece | State |
|---|---|
| **Backend** (`backend/`) — FastAPI + SQLAlchemy | Real: `User`, `Product`, `Order`, `CartItem` models; endpoints for auth (register/login, JWT), products (filter/search/paginate), cart, orders, users, and a Stripe payment-intent endpoint. No tests, no `.env.example`, no migrations (Alembic is a dependency but unused so far). |
| **Mobile app** (`apps/mobile/`) — React Native + React Navigation | Real screen components exist (`HomeScreen`, `ProductDetailScreen`, `CartScreen`, `OrderTrackingScreen`, `ProfileScreen`) but there's **no `package.json`, no Expo config, and no dependency lockfile** — the app can't currently be installed or run. `HomeScreen` renders a hardcoded `mockProducts` array with `placeholder.com` image URLs; it isn't wired to the backend API yet. |
| **Web app** | Doesn't exist. No `apps/web` directory. |
| **`packages/shared`** | Doesn't exist. |
| **Deployment** | None — no live URLs, no hosting config for backend or mobile. |

## Tech stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI, SQLAlchemy, Pydantic v2, PostgreSQL (via `psycopg2-binary`), python-jose + passlib for auth, Stripe SDK |
| Mobile | React Native, React Navigation (screens only — no build config yet) |

## Getting started

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows; source venv/bin/activate on macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload  # http://localhost:8000/docs
```

You'll need a `DATABASE_URL` (Postgres) and `SECRET_KEY` env var — see
`app/core/config.py` for every setting and its default. There's no
`.env.example` yet; copying the defaults in `config.py` into a `.env`
file is the fastest way to get a local Postgres instance running against
it.

### Mobile

The screens in `apps/mobile/src/` aren't runnable as-is — there's no
`package.json` or Expo project config committed. To actually run them,
you'd first need to scaffold an Expo project (`npx create-expo-app`) and
move these screens in, then wire `HomeScreen`'s `mockProducts` up to the
real `/api/v1/products` endpoint above.

## Project layout

```
masala-store/
├── apps/
│   └── mobile/       # React Native screens (no build config yet)
└── backend/
    └── app/
        ├── api/v1/endpoints/   auth, products, cart, orders, payments, users
        ├── core/                config, database, security (JWT/bcrypt)
        └── models/              User, Product, Order, CartItem (SQLAlchemy)
```

## 🧭 Agentic AI Alignment

Honest answer: none yet. This is a conventional e-commerce backend + UI
scaffold with no LLM or autonomous-agent component. If this project
continues, the natural agentic extensions would be a reorder/inventory
agent (watching stock levels against sales velocity) or a personalized
recommendation agent over the product catalog — neither exists today,
and this section won't claim otherwise.

## 📈 Roadmap

- [ ] Wire `HomeScreen`'s mock data to the real `/api/v1/products` endpoint
- [ ] Add Expo project config so the mobile app is actually runnable
- [ ] Add Alembic migrations (dependency is already present, unused)
- [ ] Add a test suite (`pytest`/`pytest-asyncio` are in `requirements.txt`, unused)
- [ ] Decide on and build (or drop the claim of) a web app
- [ ] Deploy the backend somewhere real before claiming any market coverage

## 👨‍💻 Author

Built by **Asadullah Shafique** — [@asadullah48](https://github.com/asadullah48)

🔗 Explore my portfolio showcasing Agentic AI projects and real-world
applications: [asadullahshafique-devunity.vercel.app](https://asadullahshafique-devunity.vercel.app)
