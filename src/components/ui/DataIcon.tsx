import {
  BadgeCheck,
  Clock,
  Droplet,
  Headset,
  Sparkles,
  Truck,
  type LucideIcon,
} from 'lucide-react';

/** Maps the string icon keys used in data files to lucide components. */
export const iconMap: Record<string, LucideIcon> = {
  droplet: Droplet,
  sparkles: Sparkles,
  clock: Clock,
  'badge-check': BadgeCheck,
  truck: Truck,
  headset: Headset,
};

export function DataIcon({
  name,
  size = 22,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon size={size} className={className} strokeWidth={1.5} aria-hidden="true" />;
}
