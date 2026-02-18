import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCard } from '../../components/book-card/book-card';
import { LibraryStore } from '../../api/library-store';

@Component({
  selector: 'app-book-catalogue',
  imports: [BookCard, CommonModule],
  templateUrl: './book-catalogue.html',
  styleUrl: './book-catalogue.css',
})
export class BookCatalogue {
  libraryStore = inject(LibraryStore);
  books = this.libraryStore.books();
}
