
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private wishlistService = inject(WishlistService);
  private cdr = inject(ChangeDetectorRef);

  product: Product | null = null;

  loading = true;
  errorMessage = '';

  selectedSize = '';
  selectedColor = '';
  quantity = 1;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (!id) {
        this.errorMessage = 'Không tìm thấy ID sản phẩm!';
        this.loading = false;
        return;
      }

      this.loadProduct(id);
    });
  }

  // Tải sản phẩm theo ID
loadProduct(id: string): void {
  this.loading = true;
  this.errorMessage = '';
  this.product = null;

  this.quantity = 1;
  this.selectedSize = '';
  this.selectedColor = '';

  this.productService.getProductById(id).subscribe({
    next: (response) => {
      this.product = response.data;

      if (this.product) {
        this.selectedSize = this.product.sizes?.[0] || '';
        this.selectedColor = this.product.colors?.[0] || '';
        this.quantity = 1;
      } else {
        this.errorMessage = 'Không tìm thấy sản phẩm!';
      }

      this.loading = false;

      // Cập nhật giao diện ngay sau khi nhận dữ liệu
      this.cdr.detectChanges();
    },

    error: (error) => {
      console.error('Lỗi lấy sản phẩm:', error);

      this.errorMessage = 'Không thể tải thông tin sản phẩm!';
      this.loading = false;

      // Cập nhật giao diện khi xảy ra lỗi
      this.cdr.detectChanges();
    }
  });
}

  // Kiểm tra yêu thích
  isFavorite(): boolean {
    if (!this.product) return false;

    return this.wishlistService.isFavorite(this.product._id);
  }

  // Thêm hoặc bỏ yêu thích
  toggleFavorite(): void {
    if (!this.product) return;

    this.wishlistService.toggleFavorite(this.product);
  }

  // Chọn size
  selectSize(size: string): void {
    this.selectedSize = size;
  }

  // Chọn màu
  selectColor(color: string): void {
    this.selectedColor = color;
  }

  // Tăng số lượng
  increaseQuantity(): void {
    if (!this.product || this.product.stock <= 0) return;

    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  // Giảm số lượng, không cho nhỏ hơn 1
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Nhập số lượng trực tiếp
  onQuantityChange(value: string | number): void {
    if (!this.product) return;

    const stock = Number(this.product.stock) || 0;

    // Nếu sản phẩm hết hàng, giữ số lượng mặc định là 1
    if (stock <= 0) {
      this.quantity = 1;
      return;
    }

    let newQuantity = Math.floor(Number(value));

    // Không cho nhập rỗng, 0, số âm hoặc giá trị không hợp lệ
    if (!Number.isFinite(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
    }

    // Không cho vượt quá tồn kho
    if (newQuantity > stock) {
      newQuantity = stock;
    }

    this.quantity = newQuantity;
  }
}
