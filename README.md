# 🌶️ Masala Store — South Asian Grocery & Spice Platform

> Cross-platform grocery and spice store serving South Asian communities across Canada. Available on iOS, Android, and Web.

![React Native](https://img.shields.io/badge/React_Native-0.73-61DAFB?logo=react)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)
![Status](https://img.shields.io/badge/status-active-brightgreen)

## 📱 Platforms
| Platform | Status |
|----------|--------|
| iOS App | ✅ Live |
| Android App | ✅ Live |
| Web App | ✅ Live |

## ✨ Features
- 🛒 Smart Shopping Cart — multi-vendor with real-time stock
- 🌶️ Spice Catalog — 1000+ authentic South Asian products
- 🔍 Bilingual Search — English and Urdu
- 📦 Order Tracking — real-time delivery with live map
- 💳 Stripe Payments — CAD currency
- 🏷️ Weekly Deals — flash sales and bulk discounts
- 🔄 Recurring Orders — subscribe and save

## 🏗️ Architecture
\\\
masala-store/
├── apps/
│   ├── mobile/     # React Native (Expo) — iOS & Android
│   └── web/        # Next.js 14 — Web storefront
├── packages/shared/ # Shared types, utils, constants
└── backend/        # FastAPI + PostgreSQL
\\\

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Mobile | React Native 0.73 + Expo SDK 50 |
| Web | Next.js 14 + Tailwind CSS |
| Backend | FastAPI + Python 3.11 |
| Database | PostgreSQL 15 + SQLAlchemy |
| Payments | Stripe (CAD) |
| Search | Bilingual (English + Urdu) |

## 🚀 Getting Started

### Backend
\\\ash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
\\\

### Mobile
\\\ash
cd apps/mobile
npm install
npx expo start
\\\

## 🌍 Market Coverage
🇨🇦 Toronto · Brampton · Mississauga · Vancouver · Calgary

## 👨‍💻 Developer
**Asadullah Shafique** — [@asadullah48](https://github.com/asadullah48)
