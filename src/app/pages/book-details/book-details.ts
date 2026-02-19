import { Component, computed, inject } from '@angular/core';
import { Book } from '../../api/book-api';
import { LibraryStore } from '../../api/library-store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  imports: [],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails {
  private route = inject(ActivatedRoute);
  private libraryStore = inject(LibraryStore);
  private id = Number(this.route.snapshot.paramMap.get('id'));
  book = this.libraryStore.getBookById(this.id);
}