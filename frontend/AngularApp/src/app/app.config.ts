import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

const tokenInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const token = sessionStorage.getItem('access_token');
  if (!token) {
    console.log('Request:', request);
    return next(request);
  }
  const req = request.clone({
    headers: request.headers.set('Authorization', 'Bearer ' + token),
  });
  console.log('Request:', req);
  return next(req);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimations(),
  ],
};
