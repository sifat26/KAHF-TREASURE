'use client';

import { useEffect, useState } from 'react';
import { reviewServices } from '@/services/review.services';
import type { Review } from '@/types/review';
import { Check, Star, Loader2 } from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { const res = await reviewServices.getReviews(); if (res.success) setReviews(res.data || []); }
    catch {} finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleApprove = async (id: string, show: boolean) => {
    try { await reviewServices.approveReview(id, show); load(); }
    catch (e: any) { alert(e?.message || 'ব্যর্থ'); }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-stone-900">রিভিউ ব্যবস্থাপনা</h1>
      {loading ? (
        <div className="py-10 text-center text-stone-400">লোড হচ্ছে...</div>
      ) : (
        <div className="space-y-3">
          {reviews.map(review => (
            <div key={review._id} className="rounded-2xl border border-stone-200 bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-stone-800">{review.customerName}</p>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-stone-600">{review.comment}</p>
                  <p className="mt-1 text-xs text-stone-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  {review.isApproved ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">অনুমোদিত</span>
                  ) : (
                    <button onClick={() => handleApprove(review._id, true)}
                      className="flex items-center gap-1 rounded-full bg-amber-700 px-3 py-1 text-xs font-medium text-white hover:bg-amber-800">
                      <Check className="h-3 w-3" /> অনুমোদন
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {reviews.length === 0 && <div className="py-10 text-center text-stone-400">কোনো রিভিউ নেই</div>}
        </div>
      )}
    </div>
  );
}
