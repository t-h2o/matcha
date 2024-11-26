import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { token } from '../models/token';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenSignal = signal<token | undefined | null>(undefined);
  private socketService = inject(SocketService);
  private tokenComputed = computed(() => this.tokenSignal()?.access_token);

  constructor() {
    effect(
      () => {
        const token = this.tokenComputed();
        if (token) {
          this.socketService.initializeSocket(token);
        }
      },
      { allowSignalWrites: true },
    );
  }
}
