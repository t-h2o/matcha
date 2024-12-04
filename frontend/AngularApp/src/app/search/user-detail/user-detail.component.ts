import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../UI/card/card.component';
import { PotentialMatchService } from '../../shared/services/potentialMatch.service';
import { getFameRatingStars } from '../../shared/utils/displayUtils';
import { GeneralComponent } from './general/general.component';
import { MatchInterestsComponent } from './interests/match-interests.component';
import { PicturesComponent } from './pictures/pictures.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatchInterestsComponent,
    GeneralComponent,
    PicturesComponent,
    CardComponent,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  private PotentialMatchService = inject(PotentialMatchService);
  username = input.required<string>();
  user = this.PotentialMatchService.otherProfileData;
  isLikedByUser = signal<boolean>(true);
  isOnline = signal<boolean>(true);

  ngOnInit(): void {
    this.PotentialMatchService.getUserProfileByUsername(this.username());
  }

  get heartIcon(): string {
    return this.isLikedByUser()
      ? '/icons/heart_full.svg'
      : '/icons/heart_empty.svg';
  }

  get FameRatingStars(): string {
    return getFameRatingStars(this.user().fameRating);
  }

  toggleLike(): void {
    if (this.isLikedByUser()) {
      let payload = { like: this.user().username };
      this.PotentialMatchService.toggleLike(payload);
    } else {
      let payload = { dislike: this.user().username };
      this.PotentialMatchService.toggleLike(payload);
    }

    this.isLikedByUser.set(!this.isLikedByUser());
  }

  reportAsFake(username: string): void {
    console.log(`reporting ${username} as fake`);
    // this.PotentialMatchService.reportUserAsFake(this.user.username);
  }
}
