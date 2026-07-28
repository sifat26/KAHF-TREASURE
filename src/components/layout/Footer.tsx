import React from 'react';
import { Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-[#040404] border-t border-[rgba(201,168,76,0.1)] py-20 mt-20 text-center overflow-hidden" role="contentinfo">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" aria-hidden="true"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[rgba(201,168,76,0.03)] rounded-full blur-[60px]" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="font-display text-[2rem] font-bold text-white tracking-[0.2em] mb-4 uppercase">KAHF TREASURE</div>
        <p className="font-bengali text-[0.95rem] text-[var(--text-secondary)] max-w-[500px] mx-auto mb-10 leading-relaxed">
          আতর, মধু, ইসলামী বই এবং অন্যান্য ইসলামী পণ্য — সবই এখন আপনার হাতের নাগালে।
        </p>
        
        <div className="flex justify-center gap-6 mb-12">
          <a href="https://www.facebook.com/KAHFTreasure" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)] transition-all hover:bg-[var(--color-gold-500)] hover:text-[#060606] hover:scale-110">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://wa.me/8801681253714" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)] transition-all hover:bg-[var(--color-gold-500)] hover:text-[#060606] hover:scale-110">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="mailto:kahftreasure@gmail.com" aria-label="Email" className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)] transition-all hover:bg-[var(--color-gold-500)] hover:text-[#060606] hover:scale-110">
            <Mail size={18} />
          </a>
        </div>
        
        <p className="font-sans text-[0.75rem] text-[rgba(255,255,255,0.2)] tracking-[0.05em] uppercase mb-2">
          &copy; {new Date().getFullYear()} KAHF TREASURE. All Rights Reserved.
        </p>
        <p className="font-sans text-[0.65rem] text-[rgba(212,175,55,0.25)] tracking-[0.1em]">
          Developer — <span className="text-[rgba(212,175,55,0.35)] transition-colors hover:text-[var(--color-gold-400)]">Tanvir Ahmmed Sifat</span>
        </p>
      </div>
    </footer>
  );
}
