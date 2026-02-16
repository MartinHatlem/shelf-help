import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


export interface User {
  id: number;
  name: string;
  collection: string[];
}

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private http = inject(HttpClient);
  private userURL = `${environment.apiUrl}/shelf_help_users`;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL);
  }
}
