import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


export interface Book {
  id: number
  title: string
  author: string
  coverImg: string
  blurb?: string
}

export type CreateBook = Omit<Book, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class BookApi {
  private http = inject(HttpClient);
  private bookURL = `${environment.apiUrl}/shelf_help_books`;
  private apiKey = environment.apiKey;

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookURL);
  }

  loadBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.bookURL}/${id}`);
  }

  addBook(book: CreateBook): Observable<Book> {
    const headers = { 'Content-Type': 'application/json', 'x-api-key': this.apiKey };
    return this.http.post<Book>(this.bookURL, book, {headers});
  }
}