import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Message } from '../../../shared/models/message';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-display-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-messages.component.html',
  styleUrl: './display-messages.component.scss',
})
export class DisplayMessagesComponent {
  @Input() messages: Message[] = [];
  private userService = inject(UserService);

  get username(): string {
    return this.userService.ownProfileData().username;
  }
}
