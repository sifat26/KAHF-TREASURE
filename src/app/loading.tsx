export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="লোড হচ্ছে…">
      <span className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute h-16 w-16 animate-spin rounded-full border-2 border-line border-t-[var(--color-gold)]" />
        <span className="font-display text-lg tracking-[0.2em] text-[var(--color-gold-deep)]">KT</span>
      </span>
    </div>
  );
}
