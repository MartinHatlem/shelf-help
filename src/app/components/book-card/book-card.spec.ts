import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BookCard } from './book-card';
import { Book } from '../../api/book-api';

const mockBook: Book = {
  id: 1,
  title: 'Test Book',
  author: 'Jane Doe',
  coverImg: 'https://example.com/cover.jpg',
  isbn: '1234567890',
  rating: 4.5,
  blurb: 'A fascinating test book for unit testing.'
};

describe('BookCard', () => {
  let component: BookCard;
  let fixture: ComponentFixture<BookCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCard, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCard);
    component = fixture.componentInstance;
    component.book = mockBook;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
