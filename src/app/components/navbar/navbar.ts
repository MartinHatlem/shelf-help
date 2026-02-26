import { Component, inject, effect, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LibraryStore } from '../../api/library-store';
import { CommonModule, NgIf } from '@angular/common';

import Keycloak from 'keycloak-js';

@Component({
	selector: 'app-navbar',
	imports: [RouterModule, CommonModule, NgIf],
	templateUrl: './navbar.html',
	styleUrl: './navbar.css',
})
export class Navbar {
	private libraryStore = inject(LibraryStore);
	user = this.libraryStore.currentUser;
	keycloakUsername = signal('');

	protected readonly keycloak = inject(Keycloak);

    updateUsername() {
        this.keycloak.loadUserInfo().then((userInfo) => {
				this.keycloakUsername.set(userInfo['name'] || '');
		});
    }

    constructor() {
        this.updateUsername();
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
