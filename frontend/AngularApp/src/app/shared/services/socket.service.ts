import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl, {
      withCredentials: true,
      transports: ['websocket'],
      autoConnect: true
    });

    // Connection event handlers
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server:', reason);
    });
  }

  sendMessage(message: string): void {
    console.log("Sending message:", message);
    this.socket.emit('message', message);
  }

  getResponse(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('response', (data) => {
        observer.next(data);
      });
    });
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}