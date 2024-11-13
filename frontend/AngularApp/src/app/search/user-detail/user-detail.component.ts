import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PotentialMatchService } from '../../shared/services/potentialMatch.service';
import { GeneralComponent } from './general/general.component';
import { MatchInterestsComponent } from './interests/match-interests.component';
import { PicturesComponent } from './pictures/pictures.component';
import { CardComponent } from '../../UI/card/card.component';
import { getFameRatingStars } from '../../shared/utils/displayUtils';

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

  ngOnInit(): void {
    this.PotentialMatchService.getUserProfileByUsername(this.username());
  }

  get heartIcon(): string {
    return this.isLikedByUser()
      ? '/icons/heart_minus.svg'
      : '/icons/heart_plus.svg';
  }

  get FameRatingStars(): string {
    // return getFameRatingStars(this.user.fameRating);
    return getFameRatingStars(3);
  }

  toggleLike(): void {
    this.isLikedByUser.set(!this.isLikedByUser());
  }

  reportAsFake(username: string): void {
    console.log(`reporting ${username} as fake`);
    // this.PotentialMatchService.reportUserAsFake(this.user.username);
  }
}
