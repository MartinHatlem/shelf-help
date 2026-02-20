import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { LibraryStore } from '../../api/library-store';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ) => {
    
    const libraryStore = inject(LibraryStore);
    const isAuthenticated = libraryStore.currentUser() !== null;

    return isAuthenticated;
};
