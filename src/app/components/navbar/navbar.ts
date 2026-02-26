import { Component, inject, effect, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LibraryStore } from '../../api/library-store';
import { CommonModule, NgIf } from '@angular/common';

import Keycloak from 'keycloak-js';
import {
	KEYCLOAK_EVENT_SIGNAL,
	KeycloakEventType,
	typeEventArgs,
	ReadyArgs,
} from 'keycloak-angular';

@Component({
	selector: 'app-navbar',
	imports: [RouterModule, CommonModule, NgIf],
	templateUrl: './navbar.html',
	styleUrl: './navbar.css',
})
export class Navbar {
	private router = inject(Router);
	private libraryStore = inject(LibraryStore);
	user = this.libraryStore.currentUser;

	authenticated = false;
	keycloakStatus: string | undefined;
	keycloakUsername = signal('');

	private readonly keycloak = inject(Keycloak);
	private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

	constructor() {
		effect(() => {
			const keycloakEvent = this.keycloakSignal();

			this.keycloakStatus = keycloakEvent.type;

			if (keycloakEvent.type === KeycloakEventType.Ready) {
				this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
			}

			if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
				this.authenticated = false;
			}
			this.keycloak.loadUserInfo().then((userInfo) => {
				this.keycloakUsername.set(userInfo['name'] || '');
			});
		});
	}

	login() {
		this.keycloak.login();
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
}
