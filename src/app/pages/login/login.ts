import { Component, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LibraryStore } from '../../api/library-store';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Keycloak from 'keycloak-js';

@Component({
	selector: 'app-login',
	imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
	templateUrl: './login.html',
	styleUrl: './login.css',
})
export class Login implements OnInit {
	private store = inject(LibraryStore);
	private router = inject(Router);
	private keycloak = inject(Keycloak);

	name = '';
	users = this.store.users;
	loading = this.store.usersLoading;
	error = this.store.usersError;

	ngOnInit() {
		this.store.setCurrentUser(null); // Log out automatically when visiting login page
		this.store.loadUsers();
	}

	login() {
		if (typeof window !== 'undefined') {
			this.keycloak.login();
		} else {
			alert('Keycloak login is not available in this environment.');
		}
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
