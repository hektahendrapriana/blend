export interface Category {
  id: string;
  title: string;
  label: string;
  value: string;
  category: string;
}

export interface Brand {
  id: string;
  title: string;
  label: string;
  value: string;
  brand: string;
}

export interface Page {
  _id: number;
  title: string;
  description: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface Product {
  _id: string;
  sku: string;
  product_name: string;
  product_info: string;
  product_type: string;
  brand: string;
  product_image_url: File[];
  product_price: number;
  real_pdp_url: string;
  descriptions: string;
}


export interface ProductDetails {
  _id: string;
  sku: string;
  product_name: string;
  product_info: string;
  product_type: string;
  brand: string;
  product_image_url: File[];
  product_price: number;
  real_pdp_url: string;
  descriptions: string;
}
