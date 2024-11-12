import { Component, inject } from '@angular/core';
import { CardComponent } from '../../UI/card/card.component';
import { UserService } from '../../shared/services/user.service';

const personWhoLikedYou: { username: string }[] = [
  {
    username: 'Tony',
  },
  {
    username: 'Stark',
  },
  {
    username: 'Iron',
  },
  {
    username: 'Mike',
  },
];

const personWhoVisitedYou: { username: string }[] = [
  {
    username: 'Tony',
  },
  {
    username: 'Stark',
  },
  {
    username: 'Iron',
  },
  {
    username: 'Mike',
  },
  {
    username: 'John',
  },
  {
    username: 'Peter',
  },
  {
    username: 'Parker',
  },
  {
    username: 'Tom',
  },
];

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  private userService = inject(UserService);
  user = this.userService.ownProfileData();

  get personWhoLikedYou(): { username: string }[] {
    return personWhoLikedYou;
  }

  get personWhoVisitedYou(): { username: string }[] {
    return personWhoVisitedYou;
  }
}
