import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BookCatalogue } from './book-catalogue';
import { LibraryStore } from '../../api/library-store';

class MockLibraryStore {
  books() {
    return [{ title: 'Test Book', author: 'Test Author' }];
  }
  currentUser() {
    return { name: 'Test User' };
  }
}

describe('BookCatalogue', () => {
  let component: BookCatalogue;
  let fixture: ComponentFixture<BookCatalogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCatalogue, RouterTestingModule],
      providers: [
        { provide: LibraryStore, useClass: MockLibraryStore }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCatalogue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a book grid container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.book-grid')).toBeTruthy();
  });

  it('should load book card components', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
    expect(compiled.querySelector('app-book-card')).toBeTruthy();
  });

});
