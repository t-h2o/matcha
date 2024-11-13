import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private baseUrl = environment.apiUrl;

  constructor() {
    this.socket = io(this.baseUrl);

    this.socket.on('response', (data) => {
      console.log('Server response:', data);
    });
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }
}
