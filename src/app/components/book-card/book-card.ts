import { Component, computed, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../../api/book-api';
import { RouterLink } from '@angular/router';
import { LibraryStore } from '../../api/library-store';
import Keycloak from 'keycloak-js';


@Component({
	selector: 'app-book-card',
	imports: [MatCardModule, MatIconModule, RouterLink],
	templateUrl: './book-card.html',
	styleUrl: './book-card.css',
})
export class BookCard {
	@Input() book!: Book;

	store = inject(LibraryStore);
	private readonly keycloak = inject(Keycloak);

	readonly favorite = computed(() => {
		const user = this.store.currentUser();
		return !!user?.collection?.includes(this.book?.id);
	});

	toggleFavorite() {
		if (!this.keycloak.authenticated) {
			alert('Please log in to manage your reading list!');
			return;
		}
		if (this.favorite()) {
			this.store.removeBookFromCollection(this.book.id);
		} else {
			this.store.addBookToCollection(this.book.id);
		}
	}
}
