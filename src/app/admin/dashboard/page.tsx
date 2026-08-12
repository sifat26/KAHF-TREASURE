'use client';

import { useEffect, useState } from 'react';
import { productServices } from '@/services/product.services';
import { orderServices } from '@/services/order.services';
import { categoryServices } from '@/services/category.services';
import Link from 'next/link';
import {
  Package, ShoppingCart, FolderTree, TrendingUp,
  Clock, CheckCircle, Truck, XCircle, Plus, ArrowRight, RefreshCw
} from 'lucide-react';

const STATUS_LABELS: Record<string, string> = {
  pending: 'পেন্ডিং', confirmed: 'কনফার্মড', processing: 'প্রসেসিং',
  shipped: 'শিপড', delivered: 'ডেলিভার্ড', cancelled: 'বাতিল',
};
const STATUS_COLORS: Record<string, string> = {
  pending: 'text-amber-600 bg-amber-50',
  confirmed: 'text-blue-600 bg-blue-50',
  processing: 'text-purple-600 bg-purple-50',
  shipped: 'text-indigo-600 bg-indigo-50',
  delivered: 'text-emerald-600 bg-emerald-50',
  cancelled: 'text-red-600 bg-red-50',
};
const STATUS_ICONS: Record<string, React.ElementType> = {
  pending: Clock, confirmed: CheckCircle, processing: Package,
  shipped: Truck, delivered: CheckCircle, cancelled: XCircle,
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    products: 0, orders: 0, categories: 0, revenue: 0,
    deliveredOrders: 0, pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [ordersByStatus, setOrdersByStatus] = useState<Record<string, number>>({});

  const load = async () => {
    setLoading(true);
    try {
      // Fetch stats in parallel
      const [prodRes, orderRes, catRes, deliveredRes] = await Promise.all([
        productServices.getProducts({ limit: 1 }),
        // Fetch a large page to calculate revenue accurately from recent orders
        orderServices.getOrders({ limit: 50, page: 1 }),
        categoryServices.getCategories(),
        orderServices.getOrders({ limit: 1, status: 'delivered' }),
      ]);

      const allOrders: any[] = orderRes.data || [];

      // Count by status
      const statusCount: Record<string, number> = {};
      allOrders.forEach((o: any) => {
        statusCount[o.status] = (statusCount[o.status] || 0) + 1;
      });
      setOrdersByStatus(statusCount);

      // Revenue from delivered orders only (most accurate metric)
      const revenue = allOrders
        .filter((o: any) => o.status === 'delivered')
        .reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);

      setStats({
        products: prodRes.meta?.total || 0,
        orders: orderRes.meta?.total || 0,
        categories: catRes.data?.length || 0,
        revenue,
        deliveredOrders: deliveredRes.meta?.total || 0,
        pendingOrders: statusCount['pending'] || 0,
      });

      setRecentOrders(allOrders.slice(0, 8));
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 rounded-lg bg-stone-100 animate-pulse" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-stone-100 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'মোট পণ্য', value: stats.products.toString(),
      icon: Package, color: 'bg-blue-500', bg: 'bg-blue-50',
      href: '/admin/products', hint: 'পণ্য দেখুন →',
    },
    {
      label: 'মোট অর্ডার', value: stats.orders.toString(),
      icon: ShoppingCart, color: 'bg-amber-500', bg: 'bg-amber-50',
      href: '/admin/orders', hint: `${stats.pendingOrders} পেন্ডিং`,
    },
    {
      label: 'ক্যাটাগরি', value: stats.categories.toString(),
      icon: FolderTree, color: 'bg-emerald-500', bg: 'bg-emerald-50',
      href: '/admin/categories', hint: 'ক্যাটাগরি দেখুন →',
    },
    {
      label: 'ডেলিভার্ড আয়', value: `৳${stats.revenue.toLocaleString()}`,
      icon: TrendingUp, color: 'bg-purple-500', bg: 'bg-purple-50',
      href: '/admin/orders?status=delivered', hint: `${stats.deliveredOrders} ডেলিভার্ড`,
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">ড্যাশবোর্ড</h1>
          <p className="mt-0.5 text-sm text-stone-500">KAHF Treasure Admin Panel</p>
        </div>
        <button onClick={load}
          className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-600 hover:bg-stone-50 transition">
          <RefreshCw className="h-4 w-4" /> রিফ্রেশ
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(card => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href}
              className="group rounded-2xl border border-stone-200 bg-white p-5 hover:border-amber-300 hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wide">{card.label}</p>
                  <p className="mt-1.5 text-2xl font-bold text-stone-900 truncate">{card.value}</p>
                  <p className="mt-1 text-xs text-stone-400 group-hover:text-amber-600 transition">{card.hint}</p>
                </div>
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${card.color} shadow-sm`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Order Status Breakdown */}
      {Object.keys(ordersByStatus).length > 0 && (
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="mb-4 text-base font-semibold text-stone-900">স্ট্যাটাস অনুযায়ী অর্ডার</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Object.entries(STATUS_LABELS).map(([key, label]) => {
              const count = ordersByStatus[key] || 0;
              const Icon = STATUS_ICONS[key] || Clock;
              return (
                <Link key={key} href={`/admin/orders?status=${key}`}
                  className={`flex flex-col items-center rounded-xl p-3 text-center hover:opacity-80 transition ${STATUS_COLORS[key] || 'bg-stone-50 text-stone-600'}`}>
                  <Icon className="mb-1 h-5 w-5" />
                  <p className="text-xl font-bold">{count}</p>
                  <p className="text-xs font-medium">{label}</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Link href="/admin/products?new=1"
          onClick={() => { /* trigger new product modal */ }}
          className="flex items-center gap-3 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-4 hover:bg-amber-100 transition group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 group-hover:bg-amber-500 transition shadow-sm">
            <Plus className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-amber-950">নতুন পণ্য</p>
            <p className="text-xs text-amber-800">পণ্য যোগ করুন</p>
          </div>
        </Link>
        <Link href="/admin/categories"
          className="flex items-center gap-3 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 p-4 hover:bg-emerald-100 transition group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 group-hover:bg-emerald-700 transition">
            <FolderTree className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-emerald-900">ক্যাটাগরি</p>
            <p className="text-xs text-emerald-700">ক্যাটাগরি পরিচালনা</p>
          </div>
        </Link>
        <Link href="/admin/orders"
          className="flex items-center gap-3 rounded-2xl border border-dashed border-blue-300 bg-blue-50 p-4 hover:bg-blue-100 transition group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 group-hover:bg-blue-700 transition">
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-blue-900">অর্ডার</p>
            <p className="text-xs text-blue-700">
              {stats.pendingOrders > 0 ? `${stats.pendingOrders}টি অপেক্ষায় আছে` : 'অর্ডার পরিচালনা'}
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-900">সাম্প্রতিক অর্ডার</h2>
          <Link href="/admin/orders" className="flex items-center gap-1 text-xs font-medium text-amber-700 hover:underline">
            সব দেখুন <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-stone-400 py-6 text-center">কোনো অর্ডার নেই</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 text-left text-xs font-semibold uppercase tracking-wide text-stone-400">
                  <th className="pb-2 pr-4">ট্র্যাকিং</th>
                  <th className="pb-2 pr-4">কাস্টমার</th>
                  <th className="pb-2 pr-4">মোট</th>
                  <th className="pb-2 pr-4">স্ট্যাটাস</th>
                  <th className="pb-2">তারিখ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order: any) => {
                  const Icon = STATUS_ICONS[order.status] || Clock;
                  return (
                    <tr key={order._id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-xs font-semibold text-stone-700">{order.trackingNumber}</td>
                      <td className="py-2.5 pr-4">
                        <p className="font-medium text-stone-700">{order.customerName}</p>
                        <p className="text-xs text-stone-400">{order.phone}</p>
                      </td>
                      <td className="py-2.5 pr-4 font-bold text-stone-900">৳{(order.totalAmount || 0).toLocaleString()}</td>
                      <td className="py-2.5 pr-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[order.status] || 'bg-stone-100 text-stone-600'}`}>
                          <Icon className="h-3 w-3" />
                          {STATUS_LABELS[order.status] || order.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-xs text-stone-500">{new Date(order.createdAt).toLocaleDateString('bn-BD')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
