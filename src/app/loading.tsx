export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-dark-500)] z-50">
      <div className="relative flex items-center justify-center">
        <div className="w-[100px] h-[100px] border-[3px] border-[rgba(201,168,76,0.1)] rounded-full animate-spin border-t-[var(--color-gold-400)]"></div>
        <div className="absolute text-[2rem]">👑</div>
      </div>
    </div>
  );
}
