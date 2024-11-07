import { Component, inject, Input } from '@angular/core';
import { CardComponent } from '../../../UI/card/card.component';
import { Router } from '@angular/router';

type userItem = {
  username: string;
  name: string;
  age: number;
  location: string;
  fameRating: number;
  interests: string[];
};

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
})
export class UserItemComponent {
  @Input({ required: true }) user!: userItem;
  private router = inject(Router);

  onViewProfile(username: string) {
    this.router.navigate(['/browsing', username]);
  }
}
