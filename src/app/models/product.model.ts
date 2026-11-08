
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  salePrice: number;
  stock: number;
  categoryId: string;
  image: string;
  brand: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviewCount: number;
  status: string;
  createdAt: string;
}

export interface ProductResponse {
  success: boolean;
  total: number;
  data: Product[];
}
