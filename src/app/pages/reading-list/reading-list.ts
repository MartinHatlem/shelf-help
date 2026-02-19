import { Component, computed, inject } from '@angular/core';
import { BookCard } from '../../components/book-card/book-card';
import { LibraryStore } from '../../api/library-store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reading-list',
  imports: [BookCard, CommonModule],
  templateUrl: './reading-list.html',
  styleUrl: './reading-list.css',
})
export class ReadingList {
  private store = inject(LibraryStore);
  private currentUser = this.store.currentUser; 
  private books = this.store.books; 

  readonly readingListBooks = computed(() => {
    const user = this.currentUser();
    const bookIds = user?.collection || [];
    const allBooks = this.books();

    const byId = new Map(allBooks.map(book => [book.id, book]));
    return bookIds
      .map(id => byId.get(id))
      .filter((book): book is NonNullable<typeof book> => !!book);
  });
}
