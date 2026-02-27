import { Component, inject, effect, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibraryStore } from '../../services/api/library-store';
import { CommonModule, NgIf } from '@angular/common';

import Keycloak from 'keycloak-js';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType } from 'keycloak-angular';
import { AuthService } from '../../services/auth/auth-service';

@Component({
	selector: 'app-navbar',
	imports: [RouterModule, CommonModule, NgIf],
	templateUrl: './navbar.html',
	styleUrl: './navbar.css',
})
export class Navbar {
	private libraryStore = inject(LibraryStore);
	protected authService = inject(AuthService);
	user = this.libraryStore.currentUser;

	keycloakUsername = signal('');
	protected readonly keycloak = inject(Keycloak);
	private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

	constructor() {
		this.updateUsername();

		effect(() => {
			const keycloakEvent = this.keycloakSignal();

			if (keycloakEvent.type === KeycloakEventType.Ready) {
				if (this.keycloak.authenticated) {
					// Login
					this.authService.connectUserToBackend();
				} else {
					// Logout
					this.libraryStore.removeCurrentUser();
					this.keycloakUsername.set('');
				}
			}
		});
	}

	updateUsername() {
		this.keycloak
			.loadUserInfo()
			.then((userInfo) => {
				if (userInfo['name']) {
					this.keycloakUsername.set(userInfo['name']);
				} else {
					this.keycloakUsername.set('');
				}
			})
			.catch(() => {
				this.keycloakUsername.set('');
			});
	}

	login() {
		this.keycloak.login();
		this.updateUsername();
	}
	logout() {
		this.keycloak.logout();
	}

	getUsername(): string {
		const user = this.user();
		if (!user) {
			return 'Not logged in';
		}

		const username = user.username.charAt(0).toUpperCase() + user.username.slice(1);
		return username;
	}

	onKeydown(event: KeyboardEvent, func: () => void) {
		if (event.key === 'Enter' || event.key === ' ') {
			func();
			event.preventDefault();
		}
	}

	authenticated = signal(this.authService.authenticated());
}
