import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Message } from '../../../shared/models/message';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-display-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-messages.component.html',
  styleUrl: './display-messages.component.scss',
})
export class DisplayMessagesComponent implements OnInit {
  @Input() messages: Message[] = [];
  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUserProfile();
  }

  get username(): string {
    return this.userService.ownProfileData().username;
  }
}
