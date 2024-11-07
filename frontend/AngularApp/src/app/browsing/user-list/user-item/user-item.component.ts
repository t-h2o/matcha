import { Component, Input } from '@angular/core';
import { CardComponent } from '../../../UI/card/card.component';

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

  onViewProfile(userId: string) {
    console.log(userId);
  }
}
