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
  readonly currentUser = signal<User | null>(null);
  readonly usersLoading = signal(false);
  readonly usersError = signal<string | null>(null);

  // Book state
  readonly books = signal<Book[]>([]);
  readonly currentBook = signal<Book | null>(null);
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

  getUserById(id: number){
    this.usersLoading.set(true);
    this.usersError.set(null);
    this.userApi.loadUserById(id).subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.usersLoading.set(false);
      },
      error: () => {
        this.usersError.set('Failed to load user');
        this.usersLoading.set(false);
      },
    });
  }

  getBookById(id: number){
    this.booksLoading.set(true);
    this.booksError.set(null);
    this.bookApi.loadBookById(id).subscribe({
      next: (book) => {
        this.currentBook.set(book);
        this.booksLoading.set(false);
      },
      error: () => {
        this.booksError.set('Failed to load book');
        this.booksLoading.set(false);
      },
    });
    return this.currentBook;
    
  }

  addUser(user: CreateUser) {
    this.userApi.addUser(user).subscribe({
      next: (newUser) => {
        this.users.update(users => [...users, newUser]);
        this.currentUser.set(newUser);
        console.log('Current user set to:', user);
      },
      error: () => {
        this.usersError.set('Failed to add user');
        this.usersLoading.set(false);
      },
    });
  }

  setCurrentUser(user: User | null) {
    this.currentUser.set(user);
    console.log('Current user set to:', user);
  }
}
