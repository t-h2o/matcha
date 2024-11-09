import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PossibleMatchesUserData } from '../../../shared/models/data-to-api/user';
import { CardComponent } from '../../../UI/card/card.component';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
})
export class UserItemComponent {
  @Input({ required: true }) user!: PossibleMatchesUserData;
  private router = inject(Router);

  onViewProfile(username: string) {
    this.router.navigate(['/browsing', username]);
  }
}
