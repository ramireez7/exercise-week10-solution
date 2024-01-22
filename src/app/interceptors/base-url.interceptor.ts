import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const serverUrl = isDevMode() ? 'https://api.fullstackpro.es/assbook-lite' : 'https://api.fullstackpro.es/assbook-lite';
  const reqClone = req.clone({
    url: `${serverUrl}/${req.url}`,
  });
  return next(reqClone);
};
