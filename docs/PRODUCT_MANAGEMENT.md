# KAHF Treasure — Product Management Guide

> **Audience**: This document has two sections.
> - 📘 **[User Guide](#-user-guide--admin-panel)** — for shop admins who manage products through the browser
> - 🛠️ **[Developer Guide](#️-developer-guide--api--code)** — for developers integrating or extending the product system

---

## 📘 User Guide — Admin Panel

### Prerequisites

| Requirement | Details |
|---|---|
| Admin URL | `http://localhost:3000/admin` (local) |
| Login | `admin@kahftreasure.com` / `admin123` |
| Role required | `super_admin`, `admin`, or `editor` |

---

### 1. Logging In

1. Go to `/admin/login`
2. Enter your email and password
3. You will be redirected to the **Dashboard** automatically

> If you see "অ্যাক্সেস নেই" (Access Denied), your account role is `customer`, not admin. Contact the super admin to upgrade your role.

---

### 2. Navigating to Products

From the left sidebar, click **পণ্য** (the box icon). You will see:

- A table of all products (15 per page)
- A **search bar** — search by product name or SKU
- A **category dropdown** — filter by category
- Pagination controls at the bottom

**Status indicator icons** in the product row:
| Icon | Meaning |
|---|---|
| ⭐ | Featured product |
| 🆕 | New arrival |
| % | Currently on offer |
| 🔴 Red stock number | Out of stock |
| 🟡 Amber stock number | Low stock (below threshold) |
| 🟢 Green stock number | Stock is healthy |

---

### 3. Adding a New Product

Click the **"নতুন পণ্য"** button (top right). A modal form opens.

#### Step-by-step

**① Basic Information**

| Field | Required | Description |
|---|---|---|
| **শিরোনাম** (Title) | ✅ Yes | The product name as it appears on the shop |
| **স্লাগ** (Slug) | Auto | URL-friendly version of the title. Leave blank — generated automatically. Override only if needed |
| **বিবরণ** (Description) | No | Detailed product description. Supports plain text |
| **ক্যাটাগরি** (Category) | ✅ Yes | Select from the dropdown. Must create category first if not listed |
| **ব্র্যান্ড** (Brand) | No | Brand name (e.g. KAHF, OUD House) |

**② Pricing**

| Field | Required | Description |
|---|---|---|
| **মূল দাম** (Base Price) | ✅ Yes | The actual selling price in ৳ (BDT) |
| **তুলনামূলক দাম** (Compare Price) | No | Original/crossed-out price shown to indicate a discount. Must be higher than base price to show as a discount |
| **SKU** | No | Your internal stock code (e.g. `ATR-BLU-3ML`) |

**③ Tags**

Enter tags separated by commas (`,`). Examples:
```
bestseller, fresh, men
oud, premium, long-lasting
```
Tags are used for filtering and search on the shop frontend.

**④ Sorting & Threshold**

| Field | Default | Description |
|---|---|---|
| **সর্টিং ক্রম** (Product Order) | 0 | Lower number = shown first on shop pages |
| **কম স্টক সীমা** (Low Stock Threshold) | 5 | When total stock falls below this, the product shows a warning |

**⑤ Product Images (Cloudinary)**

1. Click the **"আপলোড"** tile (dashed border)
2. Select one or multiple image files from your computer
3. Each image is uploaded to **Cloudinary** automatically — you will see a progress counter
4. The **first image** in the list is the **main/primary image** (shown on shop listing cards)
5. Hover over any image thumbnail and click the **red ✕** button to remove it

> ⚠️ Images must be uploaded **before saving** the product. Supported formats: JPEG, PNG, WebP, GIF. Max size: 10 MB per image.

**⑥ Variants (Size, Stock & Price)**

Variants represent different sizes or options (e.g., 3ml, 6ml, 12ml).

| Field | Description |
|---|---|
| **লেবেল** (Label) | The option name, e.g. `3ml`, `S`, `Medium`, `Paperback` |
| **স্টক** (Stock) | Number of units available for this variant |
| **দাম** (Price Override) | Price for this specific variant. If empty, uses the base price |

Click **"+ ভ্যারিয়েন্ট যোগ করুন"** to add more rows. Click ✕ to remove a variant.

> A product **must have at least one variant** with stock for it to be orderable.

**⑦ Flags / Toggles**

| Checkbox | Effect |
|---|---|
| ✓ **সক্রিয়** (Active) | Product is visible on the shop. Uncheck to hide it without deleting |
| 🆕 **নতুন এসেছে** (New Arrival) | Shows on the "New Arrivals" section of the homepage |
| ⭐ **ফিচার্ড** (Featured) | Shows on the "Featured Products" section |
| % **অফারে** (On Offer) | Marks the product as on sale/offer |

**⑧ Save**

Click **"পণ্য যোগ করুন"**. If any required field is missing, an error message will appear in Bengali below the form.

---

### 4. Editing a Product

1. Find the product in the table
2. Click the **✏️ pencil icon** in the Actions column
3. The same form opens, pre-filled with existing data
4. Make your changes
5. Click **"আপডেট করুন"**

> Images already uploaded to Cloudinary remain. You can add more or remove existing ones.

---

### 5. Deleting (Deactivating) a Product

Click the **🗑️ trash icon** in the Actions column. A confirmation prompt appears.

> ⚠️ Products are **soft-deleted** — they are hidden from the shop but not permanently removed from the database. This preserves order history that references the product.

To re-activate: Edit the product and tick the **সক্রিয়** checkbox again.

---

### 6. Searching & Filtering

| Tool | How it works |
|---|---|
| 🔍 Search box | Searches product title and description (text index). Debounced — results update as you type |
| Category dropdown | Filters products to only show the selected category |
| Pagination | Navigate pages with ← / → buttons or click a page number |

---

### 7. Common Issues

| Problem | Solution |
|---|---|
| "ছবি আপলোড ব্যর্থ" (Upload failed) | Check Cloudinary credentials in `backend/.env`. See developer setup below |
| "Slug already exists" | Change the product title slightly, or manually set a unique slug |
| Product not showing on shop | Check that **সক্রিয়** is ticked and at least one variant has stock > 0 |
| Form fields cleared on save | Check for a red error message below the flags section |
| Redirected to login after action | Your session expired. Log in again. Sessions last 7 days |

---

---

## 🛠️ Developer Guide — API & Code

### Architecture Overview

```
Frontend (Next.js)          Backend (Express + MongoDB)
─────────────────           ────────────────────────────
/admin/products             GET    /api/v1/products
  └─ productServices        POST   /api/v1/products
  └─ categoryServices       PATCH  /api/v1/products/:id
  └─ httpClient             DELETE /api/v1/products/:id
                            POST   /api/v1/upload/image
                            POST   /api/v1/upload/images
```

---

### Environment Setup

**Backend** — `backend/.env`
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kahf_treasure
JWT_SECRET=kahf-treasure-jwt-secret-2026
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
FRONTEND_URL=http://localhost:3000

# Cloudinary — required for image upload
CLOUDINARY_CLOUD_NAME=your_cloud_name   # from cloudinary.com/console
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend** — `.env.local`
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

**Start both servers:**
```bash
# Terminal 1 — Backend
cd backend
npm install
npm run seed    # creates admin user + sample data (first time only)
npm run dev     # starts on :5000

# Terminal 2 — Frontend
npm install
npm run dev     # starts on :3000
```

---

### Product Data Model

**File**: [`backend/src/models/Product.ts`](file:///g:/kahf-treasure/backend/src/models/Product.ts)

```typescript
interface IProduct {
  title: string;              // Required. Product display name
  slug: string;               // Required. Unique URL key (auto-generated from title)
  description?: string;       // Optional. Supports plain text
  categoryId: ObjectId;       // Required. Ref → Category._id
  brand?: string;             // Optional
  basePrice: number;          // Required. Min: 0 (BDT)
  compareAtPrice?: number;    // Optional. Crossed-out "was" price
  images: string[];           // Array of Cloudinary HTTPS URLs
  variants: IProductVariant[];// Size/option variants (see below)
  attributes: Record<string, unknown>; // Category-specific fields (volume, isbn, etc.)
  tags: string[];             // For filtering and search
  sku?: string;               // Unique stock-keeping unit (sparse index)
  isActive: boolean;          // Default: true. false = hidden from shop
  deleted: boolean;           // Default: false. true = soft-deleted
  newArrival: boolean;        // Default: false
  isFeatured: boolean;        // Default: false
  isOnOffer: boolean;         // Default: false
  productOrder: number;       // Default: 0. Sort order (lower = first)
  averageRating: number;      // Auto-maintained by review system (0–5)
  reviewCount: number;        // Auto-maintained
  soldCount: number;          // Incremented on each order
  lowStockThreshold: number;  // Default: 5. Warning trigger
  createdAt: Date;
  updatedAt: Date;
}

interface IProductVariant {
  _id: ObjectId;
  label: string;              // e.g. "3ml", "6ml", "S", "M", "L"
  stock: number;              // Min: 0
  priceOverride?: number;     // If set, overrides basePrice for this variant
  sku?: string;
}
```

**MongoDB Indexes:**
```
categoryId        (1)    — fast category filtering
deleted + isActive (1)   — fast active product queries
title + description (text) — full-text search
slug              (unique) — URL lookups
sku               (unique, sparse) — SKU lookups
```

---

### REST API Reference

Base URL: `http://localhost:5000/api/v1`

#### `GET /products` — List products (public)

```
Query params:
  page         number   default: 1
  limit        number   default: 20, max: 100
  sort         string   default: -createdAt  (e.g. basePrice, -soldCount)
  search       string   Full-text search (title, description)
  category     string   Category ObjectId
  minPrice     number   Filter by basePrice >= value
  maxPrice     number   Filter by basePrice <= value
  tags         string   Comma-separated (e.g. "bestseller,fresh")
  isActive     boolean  default: filters out deleted only
  isFeatured   boolean  "true" to return only featured
  newArrival   boolean  "true" to return only new arrivals
```

Response:
```json
{
  "success": true,
  "data": [ ...products ],
  "meta": { "page": 1, "limit": 20, "total": 150, "totalPages": 8 }
}
```

#### `GET /products/:id` — Single product (public)

`:id` can be either:
- MongoDB ObjectId: `6882...`
- Slug: `blue-mask`

Response: `{ "success": true, "data": { ...product with populated categoryId } }`

#### `POST /products` — Create product 🔒

**Auth required**: `super_admin`, `admin`, `editor`

Request body (JSON):
```json
{
  "title": "Blue Mask",
  "description": "Aquatic blend — fresh and confident",
  "categoryId": "6882b1a2f3c4d5e6f7a8b9c0",
  "brand": "KAHF",
  "basePrice": 350,
  "compareAtPrice": 450,
  "images": [
    "https://res.cloudinary.com/your_cloud/image/upload/v1/kahf-treasure/abc.jpg"
  ],
  "variants": [
    { "label": "3ml", "stock": 50, "priceOverride": 350 },
    { "label": "6ml", "stock": 30, "priceOverride": 700 }
  ],
  "tags": ["bestseller", "fresh"],
  "sku": "ATR-BLU-3ML",
  "isFeatured": true,
  "newArrival": false,
  "isActive": true,
  "lowStockThreshold": 5,
  "productOrder": 1
}
```

Response: `201 Created` with full product object.

#### `PATCH /products/:id` — Update product 🔒

**Auth required**: `super_admin`, `admin`, `editor`

Send only the fields you want to change (partial update via `$set`):
```json
{
  "basePrice": 400,
  "isOnOffer": true
}
```

#### `DELETE /products/:id` — Soft-delete product 🔒

**Auth required**: `super_admin`, `admin`

Sets `deleted: true` and `isActive: false`. The product disappears from shop but remains in DB (order history is preserved).

Response: `{ "success": true, "data": null }`

---

### Image Upload API

Images must be uploaded **before** creating/updating a product. The backend proxies files to Cloudinary.

#### `POST /upload/image` — Upload single image 🔒

```bash
curl -X POST http://localhost:5000/api/v1/upload/image \
  -H "Authorization: Bearer <token>" \
  -F "image=@/path/to/photo.jpg"
```

Response:
```json
{ "success": true, "data": { "url": "https://res.cloudinary.com/..." } }
```

#### `POST /upload/images` — Upload multiple images 🔒

```bash
curl -X POST http://localhost:5000/api/v1/upload/images \
  -H "Authorization: Bearer <token>" \
  -F "images=@photo1.jpg" \
  -F "images=@photo2.jpg"
```

Response:
```json
{ "success": true, "data": { "urls": ["https://...", "https://..."], "count": 2 } }
```

Cloudinary transformation applied automatically:
- Resize: max 1200×1200 px (preserves aspect ratio)
- Quality: `auto` (Cloudinary optimizes)
- Format: `auto` (serves WebP/AVIF to supported browsers)

---

### Frontend Service Layer

**File**: [`src/services/product.services.ts`](file:///g:/kahf-treasure/src/services/product.services.ts)

```typescript
import { productServices } from '@/services/product.services';

// List products with filters
const res = await productServices.getProducts({
  page: 1, limit: 20, search: 'blue', category: 'catId', isFeatured: true
});
// res.data → Product[]
// res.meta → { page, limit, total, totalPages }

// Get single product by ID or slug
const res = await productServices.getProduct('blue-mask');
// res.data → Product

// Create product (admin only — token required)
const res = await productServices.createProduct(payload);

// Update product
const res = await productServices.updateProduct(id, { basePrice: 400 });

// Soft-delete
const res = await productServices.deleteProduct(id);

// Upload single image → returns Cloudinary URL string
const url = await productServices.uploadImage(file); // file: File

// Upload multiple images → returns string[]
const urls = await productServices.uploadImages(files); // files: File[]
```

All methods return `ApiResponse<T>` shape:
```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: { page: number; limit: number; total: number; totalPages: number; };
}
```

On error, they **throw** an object:
```typescript
{ success: false, message: "Product not found", statusCode: 404 }
```

---

### Frontend Types

**File**: [`src/types/product.ts`](file:///g:/kahf-treasure/src/types/product.ts)

```typescript
interface Product {
  _id: string;
  title: string;
  slug: string;
  description?: string | null;
  categoryId: string | { _id: string; name: string; slug: string; };  // populated when fetched
  brand?: string | null;
  basePrice: number;
  compareAtPrice?: number | null;
  images: string[];
  variants?: ProductVariant[];
  attributes?: Record<string, unknown>;
  tags?: string[];
  sku?: string | null;
  isActive: boolean;
  deleted: boolean;
  newArrival: boolean;
  isFeatured: boolean;
  isOnOffer: boolean;
  productOrder: number;
  averageRating?: number;
  reviewCount?: number;
  soldCount?: number;
  lowStockThreshold?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductVariant {
  _id?: string;
  label: string;
  stock: number;
  priceOverride?: number | null;
  sku?: string | null;
}
```

> ⚠️ `categoryId` can be either a plain `string` (when you POST) or a populated object (when you GET). Always check: `typeof product.categoryId === 'object'` before accessing `.name`.

---

### Admin Panel Files Reference

| File | Purpose |
|---|---|
| [`src/app/admin/products/page.tsx`](file:///g:/kahf-treasure/src/app/admin/products/page.tsx) | Products listing page + ProductModal form |
| [`src/services/product.services.ts`](file:///g:/kahf-treasure/src/services/product.services.ts) | All API calls for products and image upload |
| [`src/types/product.ts`](file:///g:/kahf-treasure/src/types/product.ts) | TypeScript interfaces |
| [`src/lib/httpClient.ts`](file:///g:/kahf-treasure/src/lib/httpClient.ts) | Auth-aware fetch wrapper |
| [`backend/src/controllers/product.controller.ts`](file:///g:/kahf-treasure/backend/src/controllers/product.controller.ts) | CRUD handler logic |
| [`backend/src/models/Product.ts`](file:///g:/kahf-treasure/backend/src/models/Product.ts) | Mongoose schema |
| [`backend/src/routes/product.routes.ts`](file:///g:/kahf-treasure/backend/src/routes/product.routes.ts) | Route definitions + auth guards |
| [`backend/src/config/cloudinary.ts`](file:///g:/kahf-treasure/backend/src/config/cloudinary.ts) | Cloudinary upload helpers |
| [`backend/src/controllers/upload.controller.ts`](file:///g:/kahf-treasure/backend/src/controllers/upload.controller.ts) | Image upload handler |
| [`backend/src/routes/upload.routes.ts`](file:///g:/kahf-treasure/backend/src/routes/upload.routes.ts) | Upload route definitions |

---

### Auth / Roles

| Role | Can read | Can create/edit | Can delete |
|---|---|---|---|
| `customer` (public) | ✅ | ❌ | ❌ |
| `editor` | ✅ | ✅ | ❌ |
| `admin` | ✅ | ✅ | ✅ |
| `super_admin` | ✅ | ✅ | ✅ |

Authentication uses JWT Bearer tokens stored in `localStorage` under key `kahf_access_token`.

The `httpClient` automatically:
1. Injects `Authorization: Bearer <token>` on every request
2. Handles `multipart/form-data` correctly for image uploads (no manual Content-Type needed)
3. Redirects to `/admin/login` automatically on 401 responses

---

### Adding a New Product Field (Developer)

To add a new field (e.g., `origin: string`):

1. **Model** — [`backend/src/models/Product.ts`](file:///g:/kahf-treasure/backend/src/models/Product.ts)
   ```typescript
   // Add to interface IProduct:
   origin?: string;
   // Add to productSchema:
   origin: String,
   ```

2. **Validation** — [`backend/src/controllers/product.controller.ts`](file:///g:/kahf-treasure/backend/src/controllers/product.controller.ts)
   ```typescript
   // Add to productSchema (Zod):
   origin: z.string().optional(),
   ```

3. **Frontend type** — [`src/types/product.ts`](file:///g:/kahf-treasure/src/types/product.ts)
   ```typescript
   // Add to Product interface:
   origin?: string | null;
   // Add to ProductPayload interface:
   origin?: string;
   ```

4. **Admin form** — [`src/app/admin/products/page.tsx`](file:///g:/kahf-treasure/src/app/admin/products/page.tsx)
   ```tsx
   // Add to form state:
   origin: product?.origin || '',
   // Add a FormInput in the JSX:
   <FormInput label="উৎপত্তি (Origin)" value={form.origin} onChange={v => setForm({ ...form, origin: v })} />
   // Add to payload in handleSave:
   origin: form.origin || undefined,
   ```

---

### Seeding Sample Products

```bash
cd backend
npm run seed
```

This creates:
- 1 super admin: `admin@kahftreasure.com` / `admin123`
- 1 test customer: `customer@test.com` / `customer123`
- 5 categories (Attar, Books, Clothing, Oud, Floral)
- 7 sample products with variants

> ⚠️ **Seed clears existing data.** Do not run in production.

---

### Troubleshooting for Developers

| Error | Cause | Fix |
|---|---|---|
| `409 Slug already exists` | Title generates a duplicate slug | Change the title or pass a unique `slug` in the request body |
| `400 Validation error` (Zod) | Required field missing or wrong type | Check the Zod schema in `product.controller.ts` |
| `401 Unauthorized` | No/expired JWT token | Log in again at `/admin/login` |
| `403 Forbidden` | Correct token but wrong role | User needs `admin` or `editor` role |
| `413 File too large` | Image > 10 MB | Compress image or increase `MAX_FILE_SIZE` in `.env` |
| Cloudinary upload fails | Missing/wrong credentials | Set `CLOUDINARY_CLOUD_NAME`, `API_KEY`, `API_SECRET` in `backend/.env` |
| Text search not working | MongoDB text index not built | Run `npm run seed` or manually create index: `db.products.createIndex({ title: "text", description: "text" })` |
