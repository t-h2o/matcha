import { Component, effect, inject, OnInit } from '@angular/core';
import { LocalizationService } from '../shared/services/localization.service';
import { UserService } from '../shared/services/user.service';
import { EmailPasswdComponent } from './email-passwd/email-passwd.component';
import { GeneralProfileComponent } from './general-profile/general-profile.component';
import { InterestsComponent } from './interests/interests.component';
import { PicturesProfileComponent } from './pictures-profile/pictures-profile.component';
import { RatingComponent } from './rating/rating.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    GeneralProfileComponent,
    PicturesProfileComponent,
    InterestsComponent,
    EmailPasswdComponent,
    RatingComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private userServices = inject(UserService);
  private localizationService = inject(LocalizationService);
  location = this.localizationService.location;

  constructor() {
    effect(() => {
      console.log('Location changed:', this.location());
    });
  }

  getLocation() {
    this.localizationService.getCurrentPosition().subscribe({
      error: (error) => {
        console.error('Error getting location:', error);
      },
    });
  }

  ngOnInit(): void {
    this.userServices.getUserProfile();
    this.userServices.getUserPictures();
    if (!this.ProfileComplete && this.location().latitude === 999) {
      this.getLocation();
    }
  }

  get ProfileComplete(): boolean {
    return this.userServices.ownProfileData().profile_complete;
  }
}
