import { Injectable, signal } from '@angular/core';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages = signal<Message[]>([]);

  add(message: Message) {
    // send message to server
  }
}
