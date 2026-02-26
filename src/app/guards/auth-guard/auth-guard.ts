import { CanActivateFn } from '@angular/router';
import { LibraryStore } from '../../services/api/library-store';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import Keycloak from 'keycloak-js';

export const authGuard: CanActivateFn = () => {
	const router = inject(Router);
	const libraryStore = inject(LibraryStore);
	const keycloak = inject(Keycloak);

	if (!keycloak.authenticated) {
		alert('You need to be logged in to access this page.');
		router.navigate(['/']);
	}
	return keycloak.authenticated;
};
