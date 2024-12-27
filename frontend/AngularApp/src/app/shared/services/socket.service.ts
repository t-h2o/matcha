import { effect, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { ChatMessageFromBack, Notification } from '../models/message';
import { AuthService } from './auth.service';
import { MessageService } from './messsage.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | null = null;
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private connectedUsers = new BehaviorSubject<string[]>([]);
  private router = inject(Router);
  private msgService = inject(MessageService);

  constructor() {
    effect(() => {
      const currentToken = this.authService.tokenSignal();
      if (currentToken?.access_token) {
        this.initializeSocket(currentToken.access_token);
      } else if (this.socket) {
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

    this.socket.on('visit', (notification: Notification) => {
      this.toastService.show(notification.content, 'success');
    });

    this.socket.on('chat', (notification: ChatMessageFromBack) => {
      console.log('msg: ' + JSON.stringify(notification));
      this.msgService.messages.update((prev) => {
        return [...prev, notification];
      });
      if (!this.router.url.match(/^\/chat\/.+/)) {
        this.toastService.show(notification.message, 'success');
      }
    });

    this.socket.on('chat-object', (notification: ChatMessageFromBack) => {
      console.log('chat-object: ' + JSON.stringify(notification));
      this.msgService.messages.update((prev) => {
        return [...prev, notification];
      });
    });
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getConnectedUsers() {
    return this.connectedUsers.asObservable();
  }
}
