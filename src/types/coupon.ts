// types/coupon.ts
export type CouponType = "percentage" | "fixed" | "shipping" | "buyXgetY";

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  appliesTo: "all" | "categories" | "products";
  applicableIds?: string[]; // Product or category IDs
  createdAt: Date;
  updatedAt: Date;
}

export type CouponFormData = Omit<
  Coupon,
  "id" | "usageCount" | "createdAt" | "updatedAt"
>;
