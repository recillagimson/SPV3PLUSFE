export type PromoObject = {
  provider: string;
  productCode: string;
  description: string;
  denomination: number;
  convenienceFee: number;
  total: number;
  cost: number;
  income: number;
  category: string;
  productType: string;
  endpoint: string;
};

export type ProductObject = {
  product_name?: string;
  product_code?: string;
  mobile_number?: string;
  description?: string;
  amount?: number;
};
