import { inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly keycloak = inject(Keycloak);
	authenticated() {
		return this.keycloak.authenticated;
	}

	hasRole(role: string) {
		return this.keycloak.tokenParsed?.realm_access?.roles?.includes(role);
	}
}
