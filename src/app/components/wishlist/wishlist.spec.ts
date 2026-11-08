import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WishlistComponent } from './wishlist';
import { WishlistService } from '../../services/wishlist.service';
import { of } from 'rxjs';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistComponent],
      providers: [
        {
          provide: WishlistService,
          useValue: {
            favorites$: of([]),
            removeFavorite: () => {},
            clearFavorites: () => {}
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});