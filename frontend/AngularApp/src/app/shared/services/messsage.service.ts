import { inject, Injectable, signal } from '@angular/core';
import { ChatMessage, Message } from '../models/message';
import { HttpRequestsService } from './http.requests.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private httpService = inject(HttpRequestsService);
    private toastService = inject(ToastService);
  messages = signal<ChatMessage[]>([]);

  sendMsg(message: Message) {
    // send message to server
  }

  getAllMessages(username: string) {
    this.httpService.getAllMsgByUsername(username).subscribe({
      next: (data: any) => {
        console.log("data" + JSON.stringify(data));
        this.messages.update(() => data);
      },
      error: (error: any) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  };
}
