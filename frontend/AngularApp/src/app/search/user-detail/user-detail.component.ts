import { Component, computed, inject, input, OnInit } from '@angular/core';
import { PotentialMatchService } from '../../shared/services/potentialMatch.service';
import { UserService } from '../../shared/services/user.service';
import { getFameRatingStars } from '../../shared/utils/displayUtils';
import { GeneralComponent } from './general/general.component';
import { MatchInterestsComponent } from './interests/match-interests.component';
import { PicturesComponent } from './pictures/pictures.component';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatchInterestsComponent, GeneralComponent, PicturesComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  private PotentialMatchService = inject(PotentialMatchService);
  private userServices = inject(UserService);
  private toastService = inject(ToastService);
  username = input.required<string>();
  otherUser = this.PotentialMatchService.otherProfileData;
  selfUser = this.userServices.ownProfileData;
  isLikedByUser = computed(() => this.otherUser().isLiked);
  isOnline = computed(() => this.otherUser().connected);

  ngOnInit(): void {
    this.PotentialMatchService.getUserProfileByUsername(this.username());
    this.userServices.getUserProfile();
  }

  get heartIcon(): string {
    return this.isLikedByUser()
      ? '/icons/heart_full.svg'
      : '/icons/heart_empty.svg';
  }

  get FameRatingStars(): string {
    return getFameRatingStars(this.otherUser().fameRating);
  }

  toggleLike(): void {
    if (this.selfUser().pictures.length === 0) {
      this.toastService.show('You need to upload a picture first', 'error');
      return;
    }
    if (!this.isLikedByUser()) {
      let payload = { like: this.otherUser().username };
      this.PotentialMatchService.toggleLike(payload);
    } else {
      let payload = { unlike: this.otherUser().username };
      this.PotentialMatchService.toggleLike(payload);
    }
  }

  reportAsFake(username: string): void {
    console.log(`reporting ${username} as fake`);
    // this.PotentialMatchService.reportUserAsFake(this.user.username);
  }
}
