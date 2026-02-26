import { inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { LibraryStore } from '../api/library-store';
import { User } from '../api/user-api';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly keycloak = inject(Keycloak);
    private libraryStore = inject(LibraryStore);
    
	authenticated() {
		return this.keycloak.authenticated;
	}

	connectUserToBackend() {
		this.keycloak.loadUserInfo().then((userInfo) => {
			// Hent brukerinfo

			// Lage bruker hvis den ikke finnes i api
			if (userInfo && userInfo['sub']) {
				// Sjekk om den finnes i api
				this.libraryStore.getUserById(userInfo['sub']).subscribe({
					next: (user) => {
						// we good
						this.libraryStore.setCurrentUser(user);
					},
					error: () => {
						// No user in api. Lag en
						const user: User = {
							id: userInfo!['sub'],
							username: userInfo!['preferred_username'],
							collection: [],
						};
						this.libraryStore.addUser(user);
						this.libraryStore.setCurrentUser(user);
					},
				});
			} else {
				console.error("userInfo or userInfo['sub'] is null");
			}
		});
	}
}
