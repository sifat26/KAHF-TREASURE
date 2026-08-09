# KAHF Treasure Backend — Implementation Plan

## Architecture Overview

Built with Express.js 5 + TypeScript + MongoDB (Mongoose 8), modeled on the Atikas Zone backend architecture but adapted for MongoDB instead of PostgreSQL/Prisma.

## Reference Feature Catalogue

| Atkias Zone Feature | Status | Approach |
|---|---|---|
| Admin auth (JWT, RBAC) | ✅ Include | Adapted: Mongoose User model with role enum |
| Product CRUD + variants | ✅ Include | Adapted: Embedded variants (no join table) |
| Category (hierarchical) | ✅ Include | Adapted: parentId self-reference |
| Product tags | ✅ Include | Adapted: String array (no Tag collection) |
| Order management | ✅ Include | Adapted: Embedded items + status history |
| Inventory tracking | ✅ Include | Adapted: Variant stock + soldCount on Product |
| Image upload (multer+sharp) | ✅ Include | Same stack, local storage |
| Coupon system | ✅ Include | Adapted: Simplified (no join tables) |
| Review system | ✅ Include | Adapted: Embedded in Product as rating fields |
| Banner management | ✅ Include | Same model |
| Shopping cart | ✅ Include | Adapted: Per-user Cart document in MongoDB |
| bKash/Nagad payment | ⏭️ Exclude | Out of scope (future phase) |
| Steadfast courier | ⏭️ Exclude | Out of scope (future phase) |
| Email/SMTP | ⏭️ Exclude | Out of scope (future phase) |
| Homepage sections | ⏭️ Exclude | Frontend concern |
| Analytics | ⏭️ Exclude | Future phase |
| YouTube videos | ⏭️ Exclude | Not needed for attar shop |
| Visitor tracking | ⏭️ Exclude | Future phase |

## Polymorphic Product Design

The `attributes` field (Mixed type in Mongoose) stores category-specific fields:
- **Attar:** `{ family, gender, longevity, volume }`
- **Book:** `{ isbn, author, pages, language }`
- **Clothing:** `{ size, material, color }`

This allows a single Product collection to serve all product types without schema conflicts.

## API Surface

9 modules, 35+ endpoints covering: auth, products, categories, cart, orders, uploads, coupons, reviews, banners.

## Phased Delivery

1. ✅ Phase 1: Core (auth, product, category) — COMPLETE
2. ✅ Phase 2: Commerce (cart, order, inventory) — COMPLETE
3. ✅ Phase 3: Marketing (coupon, review, banner) — COMPLETE
4. ⏭️ Phase 4 (future): Payment gateway, email notifications, courier API
