import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

export const authGuard: CanActivateFn = () => {
	const router = inject(Router);
	const authService = inject(AuthService);

	if (!authService.authenticated()) {
		alert('You need to be logged in to access this page.');
		router.navigate(['/']);
	}
	return authService.authenticated();
};
