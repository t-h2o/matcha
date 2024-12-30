import { inject, Injectable, signal } from '@angular/core';
import { ChatMessageFromBack, ChatMessageToBack } from '../models/message';
import { HttpRequestsService } from './http.requests.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private httpService = inject(HttpRequestsService);
  private toastService = inject(ToastService);
  messages = signal<ChatMessageFromBack[]>([]);

  sendMsg(message: ChatMessageToBack) {
    this.httpService.sendMessage(message).subscribe({
      next: (data: ChatMessageFromBack) => {
        this.messages.update((prev) => {
          return [...prev, data];
        });
      },
      error: (error: any) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }

  getAllMessages(username: string) {
    this.httpService.getAllMsgByUsername(username).subscribe({
      next: (data: any) => {
        this.messages.update(() => data);
      },
      error: (error: any) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }
}
