import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';
import { environment } from '../environments/environment';


export interface User {
  id: number;
  username: string;
  collection?: number[];
}

export type CreateUser = Omit<User, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private http = inject(HttpClient);
  private userURL = `${environment.apiUrl}/shelf_help_users`;
  private apiKey = environment.apiKey;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL);
  }

  addUser(user: CreateUser): Observable<User> {
    const headers = { 'Content-Type': 'application/json', 'x-api-key': this.apiKey };
    return this.http.post<User>(this.userURL, user, { headers });
  }
   loadUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.userURL}/${id}`);
  }

  addBookToUserCollection(userId: number, bookId: number): Observable<User> {
    const headers = { 'Content-Type': 'application/json', 'x-api-key': this.apiKey };

    return this.loadUserById(userId).pipe(
      switchMap(user => {
        if (user.collection?.includes(bookId)) {
          return of(user);
        }

        const updatedCollection = [...(user.collection || []), bookId];
        console.log("Collection after adding book:", updatedCollection);
        return this.http.patch<User>(`${this.userURL}/${userId}`, { collection: updatedCollection }, { headers });
      })
    );
  }


  removeBookFromUserCollection(userId: number, bookId: number): Observable<User> {
    const headers = { 'Content-Type': 'application/json', 'x-api-key': this.apiKey }; 

    return this.loadUserById(userId).pipe(
      switchMap(user => {
        if (!user.collection?.includes(bookId)) {
          return of(user);
        }
        const updatedCollection = user.collection.filter(id => id !== bookId);
        console.log("Collection after removing book:", updatedCollection);
        return this.http.patch<User>(`${this.userURL}/${userId}`, { collection: updatedCollection }, { headers });
      })
    );
  }
}
