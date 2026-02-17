import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


export interface User {
  id: number;
  username: string;
  collection?: string[];
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
}
