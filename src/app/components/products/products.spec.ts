import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getProducts: () => of({
              success: true,
              total: 0,
              data: []
            })
          }
        },
        {
          provide: WishlistService,
          useValue: {
            getWishlist: () => [],
            isFavorite: () => false,
            toggleWishlist: () => {}
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});