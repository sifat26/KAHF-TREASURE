import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-dark-500)] text-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_60%)] rounded-full blur-[60px]" aria-hidden="true"></div>
      
      <div className="relative z-10">
        <h1 className="font-display text-[6rem] md:text-[8rem] font-bold text-[var(--color-gold-400)] leading-none drop-shadow-[0_0_30px_rgba(201,168,76,0.2)] mb-2">404</h1>
        <h2 className="font-sans text-[1.5rem] md:text-[2rem] font-semibold text-white mb-6 tracking-wide uppercase">Page Not Found</h2>
        <p className="font-bengali text-[1.1rem] text-[var(--text-secondary)] mb-10 max-w-[400px] mx-auto">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি।
        </p>
        <Link 
          href="/" 
          className="font-sans font-semibold text-[#0a0a0a] bg-[var(--gradient-gold)] px-8 py-3.5 rounded-full transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] hover:scale-105 inline-block uppercase tracking-wider text-[0.9rem]"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
