import { CanActivateFn } from '@angular/router';
import { LibraryStore } from '../../api/library-store';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
	const router = inject(Router);
	const libraryStore = inject(LibraryStore);
	const isAuthenticated = libraryStore.currentUser() !== null;

	if (!isAuthenticated) {
		router.navigate(['/login']);
	}
	return isAuthenticated;
};
