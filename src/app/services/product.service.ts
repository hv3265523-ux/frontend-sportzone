
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/products';

  // Lấy danh sách sản phẩm
  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.apiUrl);
  }

  // Lấy chi tiết sản phẩm
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Thêm sản phẩm
  addProduct(product: Partial<Product>): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  // Cập nhật sản phẩm
  updateProduct(id: string, product: Partial<Product>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }

  // Xóa sản phẩm
  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
