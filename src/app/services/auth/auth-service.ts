import { inject, Injectable } from '@angular/core';
import Keycloak, { KeycloakUserInfo } from 'keycloak-js';
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
			if (!userInfo || !userInfo['sub']) {
				console.error("userInfo or userInfo['sub'] is null");
				return;
			}

			// Check if user from keycloak already exists in db
			this.libraryStore.getUserById(userInfo['sub']).subscribe({
				next: (user) => {
					this.libraryStore.setCurrentUser(user);
				},
				error: () => {
					// No user in api. Make one
					const user = this.createUser(userInfo);
					this.libraryStore.addUser(user);
					this.libraryStore.setCurrentUser(user);
				},
			});
		});
	}

	hasRole(role: string) {
		return this.keycloak.tokenParsed?.realm_access?.roles?.includes(role);
	}

	private createUser(userInfo: KeycloakUserInfo) {
		const user: User = {
			id: userInfo!['sub'],
			username: userInfo!['preferred_username'],
			collection: [],
		};
		return user;
	}
}
