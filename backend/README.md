# KAHF Treasure — Backend API

MongoDB-backed e-commerce backend for the KAHF Treasure attar shop.

## Quick Start

```bash
cd G:\kahf-treasure\backend
npm install
npm run seed    # seeds admin, categories, products
npm run dev     # starts at http://localhost:5000
```

## Default Credentials (after seed)

| Role | Email | Password |
|---|---|---|
| Super Admin | admin@kahftreasure.com | admin123 |
| Customer | customer@test.com | customer123 |

## API Base URL

```
http://localhost:5000/api/v1
```

## API Endpoints

### Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Customer registration |
| POST | `/auth/login` | Public | Login (returns JWT) |
| GET | `/auth/me` | Customer+ | Get profile |
| PATCH | `/auth/me` | Customer+ | Update profile |
| POST | `/auth/me/addresses` | Customer+ | Add address |
| POST | `/auth/admin` | Admin+ | Create admin/editor |

### Products
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/products` | Public | List with pagination, search, filter |
| GET | `/products/:id` | Public | Get single product (id or slug) |
| POST | `/products` | Admin+ | Create product |
| PATCH | `/products/:id` | Admin+ | Update product |
| DELETE | `/products/:id` | Admin | Soft delete product |

**Query params:** `page`, `limit`, `sort`, `search`, `category`, `minPrice`, `maxPrice`, `tags`, `isFeatured`, `newArrival`, `isActive`

### Categories
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/categories` | Public | List categories |
| GET | `/categories/:id` | Public | Get single category |
| POST | `/categories` | Admin+ | Create category |
| PATCH | `/categories/:id` | Admin+ | Update category |
| DELETE | `/categories/:id` | Admin | Soft delete |

### Cart
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/cart` | Customer | Get cart |
| POST | `/cart/items` | Customer | Add item |
| PATCH | `/cart/items/:itemId` | Customer | Update quantity |
| DELETE | `/cart/items/:itemId` | Customer | Remove item |
| DELETE | `/cart` | Customer | Clear cart |

### Orders
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/orders` | Customer+ | Create order (decrements stock) |
| GET | `/orders` | Customer+ | List orders (customers see own) |
| GET | `/orders/:id` | Customer+ | Get order (customers see own) |
| GET | `/orders/track/:trackingNumber` | Public | Track order |
| PATCH | `/orders/:id/status` | Admin+ | Update status |

### Upload
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/upload/image` | Admin+ | Upload single image |
| POST | `/upload/images` | Admin+ | Upload multiple images (max 10) |

### Coupons
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/coupons` | Customer+ | List active coupons |
| POST | `/coupons` | Admin | Create coupon |
| POST | `/coupons/validate` | Customer+ | Validate coupon code |

### Reviews
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/reviews` | Customer+ | List reviews |
| POST | `/reviews` | Customer+ | Create review |
| PATCH | `/reviews/:id/approve` | Admin+ | Approve review |

### Banners
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/banners` | Customer+ | List banners |
| POST | `/banners` | Admin | Create banner |
| PATCH | `/banners/:id` | Admin | Update banner |
| DELETE | `/banners/:id` | Admin | Soft delete |

## Data Models

- **User** — name, email, password (hashed), role, addresses[], isBlocked
- **Category** — name, slug, type (attar/book/clothing/other), attributesSchema, parentId (hierarchical)
- **Product** — title, slug, basePrice, variants[], attributes (polymorphic), images[], tags[]
- **ProductVariant** — label, stock, priceOverride, sku (embedded in product)
- **Cart** — userId, items[{productId, variantId, quantity, unitPrice}]
- **Order** — trackingNumber, items[], subtotal, shipping, totalAmount, status, statusHistories[]
- **Coupon** — code, type (percentage/fixed), value, usageLimit, validFrom/Until
- **Review** — productId, orderId, rating, comment, isApproved
- **Banner** — title, image, position (hero/promo/popup), isActive

## Role Hierarchy

1. `super_admin` — full access, bypasses all role checks
2. `admin` — product/category/order/coupon/banner management
3. `editor` — product/category/order management (no delete)
4. `customer` — cart, orders, reviews, profile

## Environment Variables

See `.env.example` for all config options.

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **Database:** MongoDB + Mongoose 8
- **Auth:** JWT + bcryptjs
- **Upload:** Multer + Sharp (auto-compress to WebP)
- **Validation:** Zod
