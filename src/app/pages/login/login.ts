import { Component, inject, OnInit, effect, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LibraryStore } from '../../api/library-store';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Keycloak from 'keycloak-js';
import {
	KEYCLOAK_EVENT_SIGNAL,
	KeycloakEventType,
	typeEventArgs,
	ReadyArgs,
} from 'keycloak-angular';

@Component({
	selector: 'app-login',
	imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
	templateUrl: './login.html',
	styleUrl: './login.css',
})
export class Login implements OnInit {
	private store = inject(LibraryStore);
	private router = inject(Router);

	authenticated = false;
	keycloakStatus: string | undefined;

	private readonly keycloak = inject(Keycloak);
	private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

	name = '';
	users = this.store.users;
	loading = this.store.usersLoading;
	error = this.store.usersError;

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
		});
	}

	ngOnInit() {
		this.store.setCurrentUser(null); // Log out automatically when visiting login page
		this.store.loadUsers();
	}

	login() {
		// if (typeof window === 'undefined') {
		// 	return;
		// }
		this.keycloak.login();
	}
	logout() {
		// if (typeof window === 'undefined') {
		// 	return;
		// }
		this.keycloak.logout();
	}

	onSubmit() {
		const trimmed = this.name.trim().toLowerCase();
		if (!trimmed) {
			alert('Username not valid!');
			return;
		}

		const currentUser = this.users().find((user) => user.username === trimmed);

		if (currentUser) {
			this.store.setCurrentUser(currentUser);
			this.router.navigate(['']);
			return;
		}

		this.store.addUser({ username: trimmed, collection: [] });
		this.router.navigate(['']);
	}
}
