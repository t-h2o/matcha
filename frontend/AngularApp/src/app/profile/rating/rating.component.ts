import { Component, inject } from '@angular/core';
import { CardComponent } from '../../UI/card/card.component';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

const personWhoVisitedYou: { username: string }[] = [
  {
    username: 'cassandra',
  },
  {
    username: 'brando',
  },
  {
    username: 'candace',
  },
  {
    username: 'alexandro',
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
  private router = inject(Router);
  user = this.userService.ownProfileData();

  get personWhoLikedYou(): string[] {
    return this.user.likedBy;
  }

  get personWhoVisitedYou(): { username: string }[] {
    return personWhoVisitedYou;
  }

  onClickHandler(username: string) {
    console.log('Clicked');
    this.router.navigate(['search', username]);
  }
}
