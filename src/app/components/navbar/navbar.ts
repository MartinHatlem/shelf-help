import { Component, inject, effect, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LibraryStore } from '../../services/api/library-store';
import { CommonModule, NgIf } from '@angular/common';

import Keycloak, { KeycloakUserInfo } from 'keycloak-js';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType } from 'keycloak-angular';
import { User } from '../../services/api/user-api';

@Component({
	selector: 'app-navbar',
	imports: [RouterModule, CommonModule, NgIf],
	templateUrl: './navbar.html',
	styleUrl: './navbar.css',
})
export class Navbar {
	private libraryStore = inject(LibraryStore);
	user = this.libraryStore.currentUser;

	private userInfo: KeycloakUserInfo | null = null;

	keycloakUsername = signal('');
	protected readonly keycloak = inject(Keycloak);
	private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

	constructor() {
		this.updateUsername();

		// Logger vi inn
		// Hent brukerinfo
		// Sjekk om bruker finnes i api
		// Lage eller koble til bruker i api

		effect(() => {
			const keycloakEvent = this.keycloakSignal();

			if (keycloakEvent.type === KeycloakEventType.Ready) {
				// If they just logged in

				this.keycloak.loadUserInfo().then((userInfo) => {
					// Hent brukerinfo
					this.userInfo = userInfo;

					// Lage bruker hvis den ikke finnes i api
					if (this.userInfo && this.userInfo['sub']) {
						// Sjekk om den finnes i api
						this.libraryStore.getUserById(userInfo['sub']).subscribe({
							next: (user) => {
								// we good
								this.libraryStore.setCurrentUser(user);
							},
							error: () => {
								// No user in api. Lag en
								const user: User = {
									id: this.userInfo!['sub'],
									username: this.userInfo!['preferred_username'],
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
		});
	}

	updateUsername() {
		this.keycloak.loadUserInfo().then((userInfo) => {
			this.keycloakUsername.set(userInfo['name'] || '');
		});
	}

	login() {
		this.keycloak.login();
		this.updateUsername();
	}
	logout() {
		this.keycloak.logout();
		this.keycloakUsername.set('');
	}

	getUsername(): string {
		const user = this.user();
		if (!user) {
			return 'Not logged in';
		}

		const username = user.username.charAt(0).toUpperCase() + user.username.slice(1);
		return username;
	}
}
