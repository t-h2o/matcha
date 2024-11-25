import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../../shared/models/message';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { DisplayMessagesComponent } from './display-messages/display-messages.component';
import { MessageService } from '../../shared/services/messsage.service';

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
  imports: [
    CardComponent,
    FormsModule,
    DisplayMessagesComponent,
    CustomButtonComponent,
  ],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss',
})
export class ChatroomComponent {
  messageService = inject(MessageService);
  username = input.required<string>();
  messages: Message[] = DummyChat;
  messageText = '';

  sendMessage(): void {
    if (this.messageText !== '') {
      const newMessage: Message = {
        senderUsername: this.username(),
        text: this.messageText,
      };
      this.messages.push({
        id: this.messages.length + 1,
        senderUsername: this.username(),
        text: this.messageText,
      });
      this.messageService.add(newMessage);
      this.messageText = '';
    }
  }
}
