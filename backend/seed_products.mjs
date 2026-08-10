// Phase 0: Pricing corrections applied in source products.ts
// This seed script imports from src/data/products.ts, so corrections flow through automatically.

import { productServices } from './src/services/product.services';
// Actually, let's just use fetch to post to the API

const API = 'http://localhost:5000/api/v1';

async function main() {
  // Login as admin
  const loginRes = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@kahftreasure.com', password: 'admin123' })
  });
  const loginData = await loginRes.json();
  const token = loginData.data.token;
  console.log('Logged in as admin');

  // Get categories
  const catRes = await fetch(`${API}/categories`);
  const catData = await catRes.json();
  const categories = catData.data;
  console.log(`Found ${categories.length} categories`);

  // Map category slugs to IDs
  const catMap = {};
  categories.forEach(c => { catMap[c.slug] = c._id; });

  // Get existing products
  const prodRes = await fetch(`${API}/products?limit=1000`);
  const prodData = await prodRes.json();
  const existingSlugs = new Set(prodData.data.map(p => p.slug));
  console.log(`Found ${existingSlugs.size} existing products`);

  // Import product data from products.ts
  const { products } = await import('G:/kahf-treasure/src/data/products.ts');
  
  let created = 0;
  let skipped = 0;

  for (const p of products) {
    if (existingSlugs.has(p.slug)) {
      skipped++;
      continue;
    }

    // Map category
    let categoryId = catMap['attar'];
    if (p.family === 'oud') categoryId = catMap['oud'] || catMap['attar'];
    else if (p.family === 'floral') categoryId = catMap['floral'] || catMap['attar'];
    else if (p.family === 'fruity') categoryId = catMap['attar'];
    else if (p.family === 'fresh') categoryId = catMap['attar'];
    else if (p.family === 'arabian') categoryId = catMap['attar'];
    else if (p.family === 'woody') categoryId = catMap['attar'];

    // Build variants from prices
    const variants = [];
    const sizes = ['3ml', '6ml', '12ml', '24ml', '50ml'];
    for (const size of sizes) {
      if (p.prices[size]) {
        variants.push({
          label: size,
          stock: p.status === 'available' ? 20 : 0,
          priceOverride: p.prices[size]
        });
      }
    }

    const payload = {
      title: p.name,
      slug: p.slug,
      description: p.description || `${p.name} â€” premium attar from KAHF Treasure`,
      categoryId,
      basePrice: Math.min(...Object.values(p.prices).filter(v => v > 0)) || 100,
      images: ['/images/exact-attar-bottle.png'],
      variants,
      attributes: {
        family: p.family || '',
        gender: p.gender || 'unisex',
      },
      tags: p.tags || [],
      isActive: p.status === 'available',
      newArrival: p.categories?.includes('new-arrivals') || false,
      isFeatured: p.categories?.includes('most-wanted') || p.bestSeller || false,
      isOnOffer: false,
      productOrder: 0,
      lowStockThreshold: 5,
    };

    try {
      const res = await fetch(`${API}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        created++;
      } else {
        console.error(`Failed: ${p.name} - ${data.message}`);
      }
    } catch (e) {
      console.error(`Error: ${p.name} - ${e.message}`);
    }
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`);
}

main().catch(console.error);

