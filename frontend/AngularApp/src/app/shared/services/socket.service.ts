import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import {
  ChatMessageFromBack,
  ChatNotificationMsg,
  Notification,
} from '../models/message';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public socket: Socket | null = null;
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private connectedUsers = new BehaviorSubject<string[]>([]);
  private router = inject(Router);
  private msgService = inject(MessageService);

private isDisconnecting = false;

public disconnectSocket(): void {
  if (this.isDisconnecting) return;
  
  this.isDisconnecting = true;
  if (this.socket) {
    this.socket.removeAllListeners();
    this.socket.disconnect();
    this.socket = null;
  }
  
  this.isDisconnecting = false;
}

  public initializeSocket(token: string): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }

    this.socket = io(environment.websocketUrl, {
      withCredentials: true,
      path: environment.production ? '/socket/' : '',
      transports: ['websocket', 'polling'],
      auth: {
        token: `Bearer ${token}`,
      },
      query: {
        token: `Bearer ${token}`,
      },
      reconnection: false,
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

    this.socket.on('chat', (notification: ChatNotificationMsg) => {
      if (!this.router.url.match(/^\/chat\/.+/)) {
        this.toastService.show(notification.content, 'success');
      }
    });

    this.socket.on('chat-object', (notification: ChatMessageFromBack) => {
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
