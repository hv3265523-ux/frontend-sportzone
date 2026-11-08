
import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Product } from '../../models/product.model';
import { WishlistService } from '../../services/wishlist.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class WishlistComponent implements OnInit, OnDestroy {
  private wishlistService = inject(WishlistService);
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();

  favorites: Product[] = [];
  private latestProducts = new Map<string, Product>();

  searchTerm = '';
  sortOption = 'default';

  currentPage = 1;
  pageSize = 8;

  loading = true;

  readonly fallbackImage =
    'https://placehold.co/600x450/f0f4fa/1265d8?text=SPORTZONE';

  ngOnInit(): void {
    // Theo dõi các sản phẩm đã yêu thích
    this.wishlistService.favorites$
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        this.favorites = products.map(product =>
          this.latestProducts.get(product._id) || product
        );

        if (this.currentPage > this.totalPages) {
          this.currentPage = Math.max(1, this.totalPages);
        }

        this.cdr.markForCheck();
      });

    // Lấy dữ liệu mới nhất từ MongoDB thông qua API
    this.loadLatestProducts();
  }

  loadLatestProducts(): void {
    this.loading = true;

    this.productService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          const products = Array.isArray(response?.data)
            ? response.data
            : [];

          this.latestProducts = new Map(
            products.map(product => [product._id, product])
          );

          this.favorites = this.wishlistService
            .getFavorites()
            .map(product =>
              this.latestProducts.get(product._id) || product
            );

          this.loading = false;
          this.cdr.detectChanges();
        },
        error: error => {
          console.error('Không thể đồng bộ sản phẩm:', error);

          // Nếu API lỗi, vẫn hiển thị danh sách đã lưu
          this.favorites = this.wishlistService.getFavorites();
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  get filteredFavorites(): Product[] {
    let result = [...this.favorites];
    const keyword = this.searchTerm.trim().toLowerCase();

    if (keyword) {
      result = result.filter(product =>
        (product.name || '').toLowerCase().includes(keyword) ||
        (product.brand || '').toLowerCase().includes(keyword)
      );
    }

    if (this.sortOption === 'price-asc') {
      result.sort((a, b) =>
        this.getDisplayPrice(a) - this.getDisplayPrice(b)
      );
    } else if (this.sortOption === 'price-desc') {
      result.sort((a, b) =>
        this.getDisplayPrice(b) - this.getDisplayPrice(a)
      );
    } else if (this.sortOption === 'name') {
      result.sort((a, b) =>
        (a.name || '').localeCompare(b.name || '')
      );
    }

    return result;
  }

  get paginatedFavorites(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;

    return this.filteredFavorites.slice(
      start,
      start + this.pageSize
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredFavorites.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
  }

  getDisplayPrice(product: Product): number {
    return product.salePrice > 0 &&
      product.salePrice < product.price
      ? product.salePrice
      : product.price;
  }

  hasSale(product: Product): boolean {
    return product.salePrice > 0 &&
      product.salePrice < product.price;
  }

  getDiscount(product: Product): number {
    if (!this.hasSale(product) || product.price <= 0) {
      return 0;
    }

    return Math.round(
      ((product.price - product.salePrice) / product.price) * 100
    );
  }

  getProductImage(product: Product): string {
    const image = product.image?.trim();

    if (!image || image.includes('product-placeholder.png')) {
      return this.fallbackImage;
    }

    return image;
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    if (image.src !== this.fallbackImage) {
      image.src = this.fallbackImage;
    }
  }

  removeFavorite(productId: string): void {
    this.wishlistService.removeFavorite(productId);
  }

  clearFavorites(): void {
    if (!confirm('Bạn có chắc muốn xóa tất cả sản phẩm yêu thích?')) {
      return;
    }

    this.wishlistService.clearFavorites();
    this.currentPage = 1;
  }

  onFilterChange(): void {
    this.currentPage = 1;
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;

    document.getElementById('wishlist-products')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.sortOption = 'default';
    this.currentPage = 1;
  }

  trackById(index: number, product: Product): string {
    return product._id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
