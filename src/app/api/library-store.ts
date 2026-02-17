import { inject, Injectable, signal } from '@angular/core';
import { BookApi, Book } from './book-api';
import { UserApi, User, CreateUser } from './user-api';


@Injectable({
  providedIn: 'root',
})
export class LibraryStore {
  private bookApi = inject(BookApi);
  private userApi = inject(UserApi);

  // User state
  readonly users = signal<User[]>([]);
  readonly usersLoading = signal(false);
  readonly usersError = signal<string | null>(null);

  // Book state
  readonly books = signal<Book[]>([]);
  readonly booksLoading = signal(false);
  readonly booksError = signal<string | null>(null);

  loadUsers() {
    this.usersLoading.set(true);
    this.usersError.set(null); 
    this.userApi.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.usersLoading.set(false);
      },
      error: (err) => {
        this.usersError.set('Failed to load users');
        this.usersLoading.set(false);
      },
    });
  }

  loadBooks() {
    this.booksLoading.set(true);
    this.booksError.set(null);
    this.bookApi.getBooks().subscribe({
      next: (books) => {
        this.books.set(books);
        this.booksLoading.set(false);
      },
      error: (err) => {
        this.booksError.set('Failed to load books');
        this.booksLoading.set(false);
      },
    });
  }

  getUserById(id: number): User | undefined {
    return this.users().find(user => user.id === id);
  }

  getBookById(id: number): Book | undefined {
    return this.books().find(book => book.id === id);
  }

  addUser(user: CreateUser) {
    this.userApi.addUser(user).subscribe({
      next: (newUser) => {
        this.users.update(users => [...users, newUser]);
      },
      error: () => {
        this.usersError.set('Failed to add user');
        this.usersLoading.set(false);
      },
    });
  }
}
