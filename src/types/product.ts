// src/types/product.ts
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  colors: number;
  images: string[];
  category: string;
  featured?: boolean;
  new?: boolean;
}