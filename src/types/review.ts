export interface Review {
  _id: string;
  productId: string;
  orderId: string;
  customerName: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  showOnHomepage: boolean;
  createdAt: string;
  updatedAt: string;
}
