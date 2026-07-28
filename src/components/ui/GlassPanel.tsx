import { cn } from '@/lib/utils';
import React from 'react';

export function GlassPanel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "bg-[var(--gradient-card)] border border-[rgba(201,168,76,0.15)] rounded-2xl shadow-[var(--shadow-gold)] backdrop-blur-md transition-all duration-[var(--transition-base)] hover:border-[rgba(201,168,76,0.3)] hover:shadow-[var(--shadow-gold-hover)] hover:-translate-y-1 relative", 
        className
      )} 
      {...props}
    >
      {/* Subtle overlay to enhance glass effect */}
      <div className="absolute inset-0 bg-[rgba(255,255,255,0.01)] pointer-events-none rounded-2xl"></div>
      
      {/* Content wrapper to stay above overlay */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
