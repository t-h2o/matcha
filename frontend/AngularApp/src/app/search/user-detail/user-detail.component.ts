import { Component, computed, inject, input, OnInit } from '@angular/core';
import { PotentialMatchService } from '../../shared/services/potentialMatch.service';
import { ToastService } from '../../shared/services/toast.service';
import { UserService } from '../../shared/services/user.service';
import {
  format24HourDateTime,
  getFameRatingStars,
} from '../../shared/utils/displayUtils';
import { GeneralComponent } from './general/general.component';
import { MatchInterestsComponent } from './interests/match-interests.component';
import { PicturesComponent } from './pictures/pictures.component';
import { BlockFakeComponent } from './block-fake/block-fake.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatchInterestsComponent,
    GeneralComponent,
    PicturesComponent,
    BlockFakeComponent,
  ],
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
  lastConnection = computed(() => {
    return format24HourDateTime(this.otherUser().lastConnection);
  });
  isFake = computed(() => this.otherUser().isFaked);

  ngOnInit(): void {
    this.PotentialMatchService.getUserProfileByUsername(this.username());
    this.userServices.getUserProfile();
    this.userServices.getUserPictures();
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
}
