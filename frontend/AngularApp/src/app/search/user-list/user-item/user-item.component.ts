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
    this.router.navigate(['/search', username]);
  }

  get sexualPreference() {
    if (this.user.sexualPreference === 'e') {
      return 'Heterosexual';
    }
    if (this.user.sexualPreference === 'o') {
      return 'Homosexual';
    }
    if (this.user.sexualPreference === 'b') {
      return 'Bisexual';
    }
    return 'NOT SPECIFIED';
  }

  get gender() {
    if (this.user.gender === 'm') {
      return 'Male';
    }
    if (this.user.gender === 'f') {
      return 'Female';
    }
    return 'NOT SPECIFIED';
  }

  get FameRatingStars(): string {
    // const fullStars = Math.floor(this.user.fameRating);
    // to test the stars
    const fullStars = 5;

    let starsString = '';
    for (let i = 0; i < fullStars; i++) {
      starsString += `<img src="/icons/star-fat.svg" alt="Star" />`;
    }
    return starsString;
  }
}
