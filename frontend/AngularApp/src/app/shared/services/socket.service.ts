import { effect, inject, Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Notification } from '../models/message';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | null = null;
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private connectedUsers = new BehaviorSubject<string[]>([]);

  constructor() {
    effect(() => {
      const currentToken = this.authService.tokenSignal();
      if (currentToken?.access_token) {
        console.log('Initializing socket with token');
        this.initializeSocket(currentToken.access_token);
      } else if (this.socket) {
        console.log('No token, disconnecting socket');
        this.socket.disconnect();
        this.socket = null;
      }
    });
  }

  private initializeSocket(token: string): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    this.socket = io(environment.websocketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      auth: {
        token: `Bearer ${token}`,
      },
      query: {
        token: `Bearer ${token}`,
      },
    });

    this.setupSocketListeners();
  }

  private setupSocketListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server:', reason);
    });

    this.socket.on('users_updated', (users: string[]) => {
      this.connectedUsers.next(users);
    });

    this.socket.on('response', (message: string) => {
      console.log('Received message:', message);
    });

    this.socket.on('like', (notification: Notification) => {
      this.toastService.show(notification.content, 'success');
    });

    this.socket.on('unlike', (notification: Notification) => {
      this.toastService.show(notification.content, 'success');
    });

    this.socket.on('match', (notification: Notification) => {
      this.toastService.show(notification.content, 'success');
    });

    this.socket.on('view', (notification: Notification) => {
      this.toastService.show(notification.content, 'success');
    });

    this.socket.on('message', (notification: Notification) => {
      this.toastService.show(notification.content, 'success');
    });
  }

  sendMessage(message: any): void {
    if (this.socket?.connected) {
      this.socket.emit('message', message);
    } else {
      console.error('Socket not connected');
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getConnectedUsers() {
    return this.connectedUsers.asObservable();
  }
}
