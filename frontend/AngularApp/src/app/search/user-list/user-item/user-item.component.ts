import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PossibleMatchesUserData } from '../../../shared/models/data-to-api/user';
import { CardComponent } from '../../../UI/card/card.component';
import {
  getFameRatingStars,
  getGender,
  getSexualPreference,
} from '../../../shared/utils/displayUtils';
// import { PotentialMatchService } from '../../../shared/services/potentialMatch.service';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
})
export class UserItemComponent {
  @Input({ required: true }) user!: PossibleMatchesUserData;
  // private matchService = inject(PotentialMatchService);
  private router = inject(Router);

  onViewProfile(username: string) {
    this.router.navigate(['/search', username]);
    // this.matchService.viewProfile(username);
  }

  get sexualPreference() {
    return getSexualPreference(this.user);
  }

  get gender() {
    return getGender(this.user);
  }

  get FameRatingStars(): string {
    return getFameRatingStars(this.user.fameRating);
  }
}
