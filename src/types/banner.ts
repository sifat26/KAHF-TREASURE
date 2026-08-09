export interface Banner {
  _id: string;
  title?: string;
  subtitle?: string;
  image?: string;
  mobileImage?: string;
  linkUrl?: string;
  buttonText?: string;
  position: 'hero' | 'promo' | 'popup';
  isActive: boolean;
  deleted: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}
