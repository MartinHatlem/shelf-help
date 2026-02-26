import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCard } from '../../components/book-card/book-card';
import { LibraryStore } from '../../services/api/library-store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-book-catalogue',
	imports: [BookCard, CommonModule, MatIconModule, MatButtonModule, RouterLink],
	templateUrl: './book-catalogue.html',
	styleUrl: './book-catalogue.css',
})
export class BookCatalogue {
	libraryStore = inject(LibraryStore);
	books = this.libraryStore.books;
}
