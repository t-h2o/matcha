import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  toast$ = this.toastSubject.asObservable();

  show(message: string, type: ToastMessage['type'] = 'info') {
    if (message.length > 40) {
      message = message.slice(0, 80) + '...';
    }
    this.toastSubject.next({ message, type });

    setTimeout(() => {
      this.clear();
    }, 2000);
  }

  clear() {
    this.toastSubject.next(null);
  }
}
