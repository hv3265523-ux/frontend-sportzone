import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },
        {
          provide: ProductService,
          useValue: {
            getProductById: () => of({
              success: true,
              data: {
                _id: '1',
                name: 'Giày thể thao',
                description: 'Sản phẩm kiểm thử',
                price: 500000,
                salePrice: 0,
                stock: 10,
                categoryId: '',
                image: '',
                brand: 'SPORTZONE',
                sizes: ['39', '40', '41'],
                colors: ['Đen', 'Trắng'],
                rating: 5,
                reviewCount: 10,
                status: 'active',
                createdAt: ''
              }
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});