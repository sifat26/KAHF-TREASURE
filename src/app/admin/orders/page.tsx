'use client';

import { useEffect, useState } from 'react';
import { orderServices } from '@/services/order.services';
import type { Order, OrderStatus } from '@/types/order';
import { Search, Eye, X, Loader2, Clock, CheckCircle, Package, Truck, XCircle, RefreshCw } from 'lucide-react';

const STATUS_LABELS: Record<string, string> = {
  pending: 'পেন্ডিং',
  confirmed: 'কনফার্মড',
  processing: 'প্রসেসিং',
  shipped: 'শিপড',
  delivered: 'ডেলিভার্ড',
  cancelled: 'বাতিল',
  refunded: 'রিফান্ড',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
  processing: 'bg-purple-100 text-purple-700 border-purple-200',
  shipped: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
  refunded: 'bg-stone-100 text-stone-600 border-stone-200',
};

const STATUS_ICONS: Record<string, React.ElementType> = {
  pending: Clock,
  confirmed: CheckCircle,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
  refunded: RefreshCw,
};

const PAYMENT_LABELS: Record<string, string> = {
  cod: 'ক্যাশ অন ডেলিভারি',
  bkash: 'বিকাশ',
  nagad: 'নগদ',
  card: 'কার্ড',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const load = async (p = page) => {
    setLoading(true);
    try {
      const params: any = { limit: 20, page: p };
      if (statusFilter) params.status = statusFilter;
      const res = await orderServices.getOrders(params);
      if (res.success) {
        setOrders(res.data || []);
        setTotalPages(res.meta?.totalPages || 1);
        setTotal(res.meta?.total || 0);
      }
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => {
    setPage(1);
    load(1);
  }, [statusFilter]);

  const filtered = search
    ? orders.filter(o =>
      o.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search)
    )
    : orders;

  const handleStatusUpdate = async (id: string, status: OrderStatus, note?: string) => {
    try {
      await orderServices.updateOrderStatus(id, status, note);
      await load();
      if (selectedOrder?._id === id) {
        setSelectedOrder(prev => prev ? { ...prev, status } : null);
      }
    } catch (e: any) { alert(e?.message || 'আপডেট ব্যর্থ'); }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">অর্ডার ব্যবস্থাপনা</h1>
          <p className="mt-0.5 text-sm text-stone-500">মোট {total} টি অর্ডার</p>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter('')}
          className={`rounded-full px-4 py-1.5 text-xs font-medium border transition ${!statusFilter ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-white border-stone-200 text-stone-600 hover:border-amber-300'}`}
        >
          সব
        </button>
        {Object.entries(STATUS_LABELS).map(([key, label]) => {
          const count = orders.filter(o => o.status === key).length;
          return (
            <button key={key} onClick={() => setStatusFilter(key)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium border transition ${statusFilter === key ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-white border-stone-200 text-stone-600 hover:border-amber-300'}`}
            >
              {label}
              {count > 0 && statusFilter !== key && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-stone-200 text-[10px] font-bold text-stone-600">{count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="ট্র্যাকিং নম্বর, নাম, ফোন দিয়ে খুঁজুন..."
          className="w-full rounded-lg border border-stone-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
          <span className="ml-2 text-stone-400">লোড হচ্ছে...</span>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50 text-left text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  <th className="p-3">ট্র্যাকিং</th>
                  <th className="p-3">কাস্টমার</th>
                  <th className="p-3">মোট</th>
                  <th className="p-3">স্ট্যাটাস</th>
                  <th className="p-3">পেমেন্ট</th>
                  <th className="p-3">তারিখ</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => {
                  const StatusIcon = STATUS_ICONS[order.status] || Clock;
                  return (
                    <tr key={order._id} className="border-b border-stone-50 hover:bg-amber-50/30 transition-colors">
                      <td className="p-3">
                        <span className="font-mono text-xs font-semibold text-stone-700">{order.trackingNumber}</span>
                      </td>
                      <td className="p-3">
                        <p className="font-medium text-stone-700">{order.customerName}</p>
                        <p className="text-xs text-stone-400">{order.phone}</p>
                        <p className="text-xs text-stone-400">{order.district}, {order.upazila}</p>
                      </td>
                      <td className="p-3">
                        <p className="font-bold text-stone-900">৳{order.totalAmount.toLocaleString()}</p>
                        <p className="text-[10px] text-stone-400">{order.items.length} পণ্য</p>
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status] || ''}`}>
                          <StatusIcon className="h-3 w-3" />
                          {STATUS_LABELS[order.status] || order.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <p className="text-xs font-medium text-stone-600">{PAYMENT_LABELS[order.paymentMethod || 'cod'] || order.paymentMethod || 'COD'}</p>
                        <p className={`mt-0.5 text-[10px] font-semibold ${order.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {order.paymentStatus === 'paid' ? '✓ পেইড' : '⏳ পেন্ডিং'}
                        </p>
                      </td>
                      <td className="p-3 text-xs text-stone-500">
                        {new Date(order.createdAt).toLocaleDateString('bn-BD')}
                        <br />
                        <span className="text-[10px]">{new Date(order.createdAt).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}</span>
                      </td>
                      <td className="p-3">
                        <button onClick={() => setSelectedOrder(order)}
                          className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-stone-500 hover:bg-amber-50 hover:text-amber-700 transition">
                          <Eye className="h-3.5 w-3.5" /> দেখুন
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <Package className="mx-auto mb-3 h-10 w-10 text-stone-200" />
                <p className="text-stone-400">কোনো অর্ডার পাওয়া যায়নি</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <button onClick={() => { setPage(p => Math.max(1, p - 1)); load(Math.max(1, page - 1)); }}
                disabled={page === 1}
                className="rounded-lg border border-stone-200 px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-50 disabled:opacity-40">
                ← আগে
              </button>
              <span className="text-sm text-stone-600">পৃষ্ঠা {page} / {totalPages}</span>
              <button onClick={() => { setPage(p => Math.min(totalPages, p + 1)); load(Math.min(totalPages, page + 1)); }}
                disabled={page === totalPages}
                className="rounded-lg border border-stone-200 px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-50 disabled:opacity-40">
                পরে →
              </button>
            </div>
          )}
        </>
      )}

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
}

function OrderDetailModal({ order, onClose, onStatusUpdate }: {
  order: Order;
  onClose: () => void;
  onStatusUpdate: (id: string, status: OrderStatus, note?: string) => Promise<void>;
}) {
  const [newStatus, setNewStatus] = useState<OrderStatus>(order.status);
  const [statusNote, setStatusNote] = useState('');
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    if (newStatus === order.status && !statusNote) return;
    setUpdating(true);
    try {
      await onStatusUpdate(order._id, newStatus, statusNote || undefined);
      onClose();
    } finally { setUpdating(false); }
  };

  const StatusIcon = STATUS_ICONS[order.status] || Clock;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl border-b border-stone-100 bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">অর্ডার বিস্তারিত</h2>
            <p className="text-xs font-mono text-stone-500">{order.trackingNumber}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${STATUS_COLORS[order.status] || ''}`}>
              <StatusIcon className="h-3 w-3" />
              {STATUS_LABELS[order.status] || order.status}
            </span>
            <button onClick={onClose} className="rounded-full p-2 text-stone-400 hover:bg-stone-100">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Customer Info */}
          <div className="grid gap-3 rounded-2xl bg-stone-50 p-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-400">কাস্টমার তথ্য</p>
              <InfoRow label="নাম" value={order.customerName} />
              <InfoRow label="ফোন" value={order.phone} />
              {order.email && <InfoRow label="ইমেইল" value={order.email} />}
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-400">ঠিকানা</p>
              <InfoRow label="জেলা" value={order.district} />
              <InfoRow label="উপজেলা" value={order.upazila} />
              <InfoRow label="ঠিকানা" value={order.addressLine} />
              {order.postalCode && <InfoRow label="পোস্টাল" value={order.postalCode} />}
            </div>
          </div>

          {order.orderNote && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-xs font-semibold text-amber-700">অর্ডার নোট:</p>
              <p className="mt-0.5 text-sm text-amber-800">{order.orderNote}</p>
            </div>
          )}

          {/* Order Items */}
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-400">অর্ডার আইটেম</p>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-stone-100 bg-stone-50 px-3 py-2.5">
                  {item.image && (
                    <img src={item.image} alt="" className="h-12 w-12 rounded-lg object-cover border border-stone-200" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-stone-800 truncate">{item.title}</p>
                    {item.variantLabel && <p className="text-xs text-stone-500">ভ্যারিয়েন্ট: {item.variantLabel}</p>}
                    <p className="text-xs text-stone-400">×{item.quantity} @ ৳{item.unitPrice.toLocaleString()}</p>
                  </div>
                  <p className="font-bold text-stone-900 text-sm">৳{item.totalPrice.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="rounded-2xl border border-stone-100 p-4 space-y-2">
            <PriceRow label="সাবটোটাল" value={`৳${order.subtotal.toLocaleString()}`} />
            <PriceRow label="ডেলিভারি চার্জ" value={`৳${order.shipping.toLocaleString()}`} />
            {order.discountAmount > 0 && (
              <PriceRow label="ছাড়" value={`-৳${order.discountAmount.toLocaleString()}`} className="text-emerald-600" />
            )}
            <div className="border-t border-stone-100 pt-2">
              <PriceRow label="মোট" value={`৳${order.totalAmount.toLocaleString()}`} bold />
            </div>
            <PriceRow label="পেমেন্ট পদ্ধতি" value={`${PAYMENT_LABELS[order.paymentMethod || 'cod'] || order.paymentMethod || 'COD'} (${order.paymentStatus === 'paid' ? '✓ পেইড' : '⏳ পেন্ডিং'})`} />
          </div>

          {/* Status History Timeline */}
          {order.statusHistories && order.statusHistories.length > 0 && (
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-400">স্ট্যাটাস হিস্ট্রি</p>
              <div className="relative space-y-0">
                {[...order.statusHistories].reverse().map((h, i, arr) => {
                  const HIcon = STATUS_ICONS[h.status] || Clock;
                  const isLast = i === arr.length - 1;
                  return (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${i === 0 ? 'border-amber-600 bg-amber-600 text-white' : 'border-stone-200 bg-white text-stone-400'}`}>
                          <HIcon className="h-3.5 w-3.5" />
                        </div>
                        {!isLast && <div className="w-0.5 flex-1 bg-stone-100" style={{ minHeight: '20px' }} />}
                      </div>
                      <div className={`pb-4 ${isLast ? 'pb-0' : ''}`}>
                        <p className={`text-sm font-semibold ${i === 0 ? 'text-amber-700' : 'text-stone-700'}`}>
                          {STATUS_LABELS[h.status] || h.status}
                        </p>
                        {h.note && <p className="text-xs text-stone-500 mt-0.5">"{h.note}"</p>}
                        <p className="text-[10px] text-stone-400 mt-0.5">
                          {new Date(h.changedAt).toLocaleString('bn-BD')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Status Update */}
          <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-400">স্ট্যাটাস আপডেট করুন</p>
            <div className="space-y-2">
              <select value={newStatus} onChange={e => setNewStatus(e.target.value as OrderStatus)}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <input
                type="text"
                value={statusNote}
                onChange={e => setStatusNote(e.target.value)}
                placeholder="নোট লিখুন (ঐচ্ছিক) — যেমন: ট্র্যাকিং আইডি, কারণ..."
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
              <button
                onClick={handleUpdate}
                disabled={updating || (newStatus === order.status && !statusNote)}
                className="w-full rounded-lg bg-amber-700 py-2.5 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {updating ? 'আপডেট হচ্ছে...' : 'স্ট্যাটাস আপডেট করুন'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-0.5 text-sm">
      <span className="text-stone-500">{label}</span>
      <span className="font-medium text-stone-800">{value}</span>
    </div>
  );
}

function PriceRow({ label, value, bold, className }: { label: string; value: string; bold?: boolean; className?: string }) {
  return (
    <div className={`flex justify-between text-sm ${className || ''}`}>
      <span className="text-stone-500">{label}</span>
      <span className={bold ? 'font-bold text-stone-900 text-base' : 'text-stone-800'}>{value}</span>
    </div>
  );
}
