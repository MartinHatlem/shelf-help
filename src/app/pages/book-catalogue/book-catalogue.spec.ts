import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCatalogue } from './book-catalogue';

describe('BookCatalogue', () => {
  let component: BookCatalogue;
  let fixture: ComponentFixture<BookCatalogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCatalogue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCatalogue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
