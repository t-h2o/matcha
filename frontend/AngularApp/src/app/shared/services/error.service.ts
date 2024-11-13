import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  error = signal('');

  showError(message: string) {
    this.error.set(message);
  }

  clearError() {
    this.error.set('');
  }
}
