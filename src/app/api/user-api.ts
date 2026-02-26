import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';
import { environment } from '../environments/environment';

export interface User {
	id: string;
	username: string;
	collection?: number[];
}

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

	addUser(user: User): Observable<User> {
		const headers = { 'Content-Type': 'application/json', 'x-api-key': this.apiKey };
		return this.http.post<User>(this.userURL, user, { headers });
	}
	loadUserById(id: string): Observable<User> {
		return this.http.get<User>(`${this.userURL}/${id}`);
	}

	addBookToUserCollection(userId: string, bookId: number): Observable<User> {
		const headers = { 'Content-Type': 'application/json', 'x-api-key': this.apiKey };

		return this.loadUserById(userId).pipe(
			switchMap((user) => {
				if (user.collection?.includes(bookId)) {
					return of(user);
				}

				const updatedCollection = [...(user.collection || []), bookId];
				console.log('Collection after adding book:', updatedCollection);
				return this.http.patch<User>(
					`${this.userURL}/${userId}`,
					{ collection: updatedCollection },
					{ headers },
				);
			}),
		);
	}

	removeBookFromUserCollection(userId: string, bookId: number): Observable<User> {
		const headers = { 'Content-Type': 'application/json', 'x-api-key': this.apiKey };

		return this.loadUserById(userId).pipe(
			switchMap((user) => {
				if (!user.collection?.includes(bookId)) {
					return of(user);
				}
				const updatedCollection = user.collection.filter((id) => id !== bookId);
				console.log('Collection after removing book:', updatedCollection);
				return this.http.patch<User>(
					`${this.userURL}/${userId}`,
					{ collection: updatedCollection },
					{ headers },
				);
			}),
		);
	}
}
