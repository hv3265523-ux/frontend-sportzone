
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {

  private productService = inject(ProductService);
  private wishlistService = inject(WishlistService);
  private cdr = inject(ChangeDetectorRef);

  products: Product[] = [];

  loading = true;
  errorMessage = '';
  totalProducts = 0;

  searchTerm = '';
  selectedBrand = '';
  selectedCategory = '';
  selectedPrice = '';
  sortOption = 'default';

  currentPage = 1;
  pageSize = 8;

  ngOnInit(): void {
    this.loadProducts();
  }

  // TẢI SẢN PHẨM
  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (response) => {
        console.log('Dữ liệu API:', response);

        this.products = Array.isArray(response?.data)
          ? [...response.data]
          : [];

        this.totalProducts = response?.total ?? this.products.length;

        console.log('Tổng sản phẩm Backend:', this.totalProducts);
        console.log('Số sản phẩm nhận được:', this.products.length);

        this.currentPage = 1;
        this.loading = false;

        this.cdr.markForCheck();
      },

      error: (error) => {
        console.error('Lỗi tải sản phẩm:', error);

        this.products = [];
        this.totalProducts = 0;
        this.loading = false;
        this.errorMessage = 'Không thể tải sản phẩm. Vui lòng thử lại!';

        this.cdr.markForCheck();
      }
    });
  }

  // YÊU THÍCH
  isFavorite(productId: string): boolean {
    return this.wishlistService.isFavorite(productId);
  }

  toggleFavorite(product: Product): void {
    this.wishlistService.toggleFavorite(product);
  }

  // THƯƠNG HIỆU
  get brands(): string[] {
    return [
      ...new Set(
        this.products.map(product => product.brand).filter(Boolean)
      )
    ];
  }

  // DANH MỤC
  get categories(): string[] {
    return [
      ...new Set(
        this.products.map(product => product.categoryId).filter(Boolean)
      )
    ];
  }

  // GIÁ HIỂN THỊ
  getDisplayPrice(product: Product): number {
    return product.salePrice > 0 && product.salePrice < product.price
      ? product.salePrice
      : product.price;
  }

  // KIỂM TRA GIẢM GIÁ
  hasSale(product: Product): boolean {
    return product.salePrice > 0 && product.salePrice < product.price;
  }

  // PHẦN TRĂM GIẢM GIÁ
  getDiscount(product: Product): number {
    if (!this.hasSale(product) || product.price <= 0) {
      return 0;
    }

    return Math.round(
      (1 - product.salePrice / product.price) * 100
    );
  }

  // LỌC SẢN PHẨM
  get filteredProducts(): Product[] {
    let result = this.products.filter(product => {
      const keyword = this.searchTerm.toLowerCase().trim();

      const matchKeyword =
        !keyword ||
        product.name?.toLowerCase().includes(keyword) ||
        product.brand?.toLowerCase().includes(keyword);

      const matchBrand =
        !this.selectedBrand || product.brand === this.selectedBrand;

      const matchCategory =
        !this.selectedCategory || product.categoryId === this.selectedCategory;

      const price = this.getDisplayPrice(product);

      let matchPrice = true;

      if (this.selectedPrice === 'under500') {
        matchPrice = price < 500000;
      } else if (this.selectedPrice === '500to1000') {
        matchPrice = price >= 500000 && price <= 1000000;
      } else if (this.selectedPrice === 'over1000') {
        matchPrice = price > 1000000;
      }

      return matchKeyword && matchBrand && matchCategory && matchPrice;
    });

    if (this.sortOption === 'price-asc') {
      result.sort((a, b) =>
        this.getDisplayPrice(a) - this.getDisplayPrice(b)
      );
    } else if (this.sortOption === 'price-desc') {
      result.sort((a, b) =>
        this.getDisplayPrice(b) - this.getDisplayPrice(a)
      );
    } else if (
      this.sortOption === 'name' ||
      this.sortOption === 'name-asc'
    ) {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOption === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }

  // TÌM KIẾM
  onSearchChange(): void {
    this.currentPage = 1;
  }

  // LỌC DANH MỤC
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
  }

  // SẮP XẾP
  onSortChange(): void {
    this.currentPage = 1;
  }

  // BỘ LỌC
  onFilterChange(): void {
    this.currentPage = 1;
  }

  // XÓA BỘ LỌC
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedBrand = '';
    this.selectedCategory = '';
    this.selectedPrice = '';
    this.sortOption = 'default';
    this.currentPage = 1;
  }

  resetFilters(): void {
    this.clearFilters();
  }

  // PHÂN TRANG
  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;

    return this.filteredProducts.slice(
      start,
      start + this.pageSize
    );
  }

  // TỔNG SỐ TRANG
  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  // DANH SÁCH TRANG
  get pages(): number[] {
    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
  }

  // CHUYỂN TRANG
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;

    window.scrollTo({
      top: 450,
      behavior: 'smooth'
    });
  }

  // THEO DÕI SẢN PHẨM
  trackById(index: number, product: Product): string {
    return product._id;
  }
}
