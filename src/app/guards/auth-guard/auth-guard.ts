import { CanActivateFn } from '@angular/router';
import { LibraryStore } from '../../api/library-store';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
	const libraryStore = inject(LibraryStore);
	const isAuthenticated = libraryStore.currentUser() !== null;

	return isAuthenticated;
};
