import { cn } from '@/lib/utils';
import React from 'react';

interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  id?: string;
}

export function SectionHeader({ title, id, className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-center mb-10 md:mb-16", className)} {...props}>
      <div className="flex-1 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent)] max-w-[150px] md:max-w-[200px]" />
      <h2 
        id={id}
        className="mx-4 md:mx-10 text-[1.6rem] md:text-[2.8rem] font-display font-semibold text-[var(--color-gold-400)] tracking-[0.15em] text-center uppercase drop-shadow-[0_0_30px_rgba(201,168,76,0.2)] whitespace-nowrap"
      >
        {title}
      </h2>
      <div className="flex-1 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent)] max-w-[150px] md:max-w-[200px]" />
    </div>
  );
}
