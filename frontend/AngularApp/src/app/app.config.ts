import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

const tokenInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const req = request.clone({
    headers: request.headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('access_token'),
    ),
  });
  console.log('Request:', req);
  return next(req);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
};
