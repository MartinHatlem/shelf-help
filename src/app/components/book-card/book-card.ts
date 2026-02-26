import { Component, computed, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../../services/api/book-api';
import { RouterLink } from '@angular/router';
import { LibraryStore } from '../../services/api/library-store';
import { AuthService } from '../../services/auth/auth-service';

@Component({
	selector: 'app-book-card',
	imports: [MatCardModule, MatIconModule, RouterLink],
	templateUrl: './book-card.html',
	styleUrl: './book-card.css',
})
export class BookCard {
	@Input() book!: Book;

	store = inject(LibraryStore);
	private readonly authService = inject(AuthService);

	readonly favorite = computed(() => {
		const user = this.store.currentUser();
		return !!user?.collection?.includes(this.book?.id);
	});

	toggleFavorite() {
		const user = this.store.currentUser();
		if (!this.authService.authenticated()) {
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
