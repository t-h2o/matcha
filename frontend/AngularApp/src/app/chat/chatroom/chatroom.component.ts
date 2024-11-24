import { Component, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../../shared/models/message';
import { CardComponent } from '../../UI/card/card.component';
import { DisplayMessagesComponent } from './display-messages/display-messages.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';

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
export class ChatroomComponent implements OnInit {
  username = input.required<string>();
  messages: Message[] = DummyChat;
  messageText = '';

  ngOnInit(): void {
    console.log(
      'ChatroomComponent, loading chatroom for user:',
      this.username(),
    );
  }

  sendMessage(): void {
    console.log('ChatroomComponent, sending message:', this.messageText);
    this.messages.push({
      id: this.messages.length + 1,
      senderUsername: this.username(),
      text: this.messageText,
    });
    this.messageText = '';
  }
}
