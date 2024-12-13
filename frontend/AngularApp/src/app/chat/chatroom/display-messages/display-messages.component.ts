import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, OnInit } from '@angular/core';
import { ChatMessageFromBack, Message } from '../../../shared/models/message';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-display-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-messages.component.html',
  styleUrl: './display-messages.component.scss',
})
export class DisplayMessagesComponent implements OnInit {
  messages = input<ChatMessageFromBack[]>([]);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUserProfile();
  }

  get username(): string {
    return this.userService.ownProfileData().username;
  }
}
