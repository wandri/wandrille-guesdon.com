import {ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {provideServiceWorker} from '@angular/service-worker';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: 'enabled'})),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
