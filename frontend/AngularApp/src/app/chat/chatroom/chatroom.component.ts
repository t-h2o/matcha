import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessageToBack, Message } from '../../shared/models/message';
import { MessageService } from '../../shared/services/messsage.service';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { DisplayMessagesComponent } from './display-messages/display-messages.component';

const DummyChat = [
  {
    id: 101,
    senderUsername: 'Alice',
    text: 'Hello Robin!',
  },
  {
    id: 102,
    senderUsername: 'roburi',
    text: 'Hi Alice!',
  },
  {
    id: 103,
    senderUsername: 'Alice',
    text: 'How are you?',
  },
  {
    id: 104,
    senderUsername: 'roburi',
    text: 'I am fine, thank you!',
  },
];

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
  messages: Message[] = DummyChat;
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
      console.log('newMessage: ' + JSON.stringify(newMessage));
      this.messageService.sendMsg(newMessage);
      this.messageText = '';
    }
  }
}
