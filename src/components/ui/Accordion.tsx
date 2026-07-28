'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItemData {
  question: string;
  answer: React.ReactNode;
}

/**
 * Accessible accordion (BRAND_GUIDELINES.md » FAQ: accordion, animated).
 * Uses button + aria-expanded/controls; content region is labelled.
 */
export function Accordion({
  items,
  className,
  defaultOpen = 0,
}: {
  items: AccordionItemData[];
  className?: string;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = React.useState<number | null>(defaultOpen);
  const reduce = useReducedMotion();

  return (
    <div className={cn('divide-y divide-line border-y border-line', className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-btn-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--color-gold-deep)]"
              >
                <span className="font-display text-lg text-ink">{item.question}</span>
                <Plus
                  size={20}
                  className={cn(
                    'shrink-0 text-muted transition-transform duration-300',
                    isOpen && 'rotate-45 text-[var(--color-gold-deep)]',
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduce ? undefined : { height: 0, opacity: 0 }}
                  animate={reduce ? undefined : { height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-8 text-muted leading-relaxed">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
