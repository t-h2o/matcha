import { Component, input, OnInit } from '@angular/core';
import { CardComponent } from '../../UI/card/card.component';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss',
})
export class ChatroomComponent implements OnInit {
  username = input.required<string>();

  ngOnInit(): void {
    console.log(
      'ChatroomComponent, loading chatroom for user:',
      this.username(),
    );
  }
}
