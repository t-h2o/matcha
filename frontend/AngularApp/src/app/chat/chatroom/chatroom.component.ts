import {
  AfterViewChecked,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessageToBack } from '../../shared/models/message';
import { MessageService } from '../../shared/services/message.service';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { DisplayMessagesComponent } from './display-messages/display-messages.component';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [FormsModule, DisplayMessagesComponent, CustomButtonComponent],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss',
})
export class ChatroomComponent implements AfterViewChecked, OnInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  messageService = inject(MessageService);
  username = input.required<string>();
  messages = computed(() => this.messageService.messages());
  messageText = '';

  ngOnInit(): void {
    this.messageService.getAllMessages(this.username());
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  sendMessage(): void {
    if (this.messageText !== '') {
      const newMessage: ChatMessageToBack = {
        to: this.username(),
        message: this.messageText,
      };
      this.messageService.sendMsg(newMessage);
      this.messageText = '';
    }
  }
}
