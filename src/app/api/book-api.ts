import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


export interface Book {
  id: number
  isbn: string
  title: string
  author: string
  coverImg: string
  rating: number
  blurb: string
}

@Injectable({
  providedIn: 'root',
})
export class BookApi {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/shelf_help_books`;

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }
  
}
