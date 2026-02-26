import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideKeycloak } from 'keycloak-angular';

export const appConfig: ApplicationConfig = {
	providers: [
		...(typeof window !== 'undefined'
			? [
					provideKeycloak({
						config: {
							url: 'https://lemur-0.cloud-iam.com/auth',
							realm: 'keycloakmvp',
							clientId: 'Keycloak-ml',
						},
						initOptions: {
							onLoad: 'check-sso',
							silentCheckSsoRedirectUri:
								window.location.origin + '../../public/silent-check-sso.html',
						},
					}),
				]
			: []),
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
		provideHttpClient(),
	],
};
