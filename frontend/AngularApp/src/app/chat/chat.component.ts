import { Component, inject, OnInit } from '@angular/core';
import { PotentialMatchService } from '../shared/services/potentialMatch.service';
import { UserService } from '../shared/services/user.service';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ContactComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  private potentialMatchService = inject(PotentialMatchService);
  private userService = inject(UserService);

  contacts = this.potentialMatchService.potentialMatches;

  ngOnInit(): void {
    this.userService.getUserProfile();
    this.potentialMatchService.getAllPotentialMatches();
  }
}
