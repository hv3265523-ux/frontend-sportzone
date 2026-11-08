import { Routes } from '@angular/router';

import { CategoriesComponent } from './components/admin/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProductsComponent } from './components/products/products';
import { WishlistComponent } from './components/wishlist/wishlist';
import { ProductDetailComponent } from './components/product-detail/product-detail';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'forgot-password', component: ForgotPasswordComponent },

  { path: 'categories', component: CategoriesComponent },

  // Trang chi tiết sản phẩm
  { path: 'products/:id', component: ProductDetailComponent },

  // Trang danh sách sản phẩm
  { path: 'products', component: ProductsComponent },

  // Trang yêu thích
  { path: 'wishlist', component: WishlistComponent },

  { path: '', redirectTo: 'categories', pathMatch: 'full' }
];