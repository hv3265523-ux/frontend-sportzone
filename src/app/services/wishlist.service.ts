import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly storageKey = 'sportzone_wishlist';

  private favoritesSubject = new BehaviorSubject<Product[]>(
    this.loadFavorites()
  );

  favorites$ = this.favoritesSubject.asObservable();

  private loadFavorites(): Product[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveFavorites(products: Product[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
    this.favoritesSubject.next(products);
  }

  getFavorites(): Product[] {
    return this.favoritesSubject.value;
  }

  isFavorite(productId: string): boolean {
    return this.getFavorites().some(p => p._id === productId);
  }

  toggleFavorite(product: Product): void {
    const favorites = this.getFavorites();

    if (this.isFavorite(product._id)) {
      this.saveFavorites(
        favorites.filter(p => p._id !== product._id)
      );
    } else {
      this.saveFavorites([...favorites, product]);
    }
  }

  removeFavorite(productId: string): void {
    this.saveFavorites(
      this.getFavorites().filter(p => p._id !== productId)
    );
  }

  clearFavorites(): void {
    this.saveFavorites([]);
  }
}