import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import {
  getAge,
  getBio,
  getFameRatingStars,
  getGender,
  getSexualPreference,
} from '../../shared/utils/displayUtils';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { LocalizationService } from '../../shared/services/localization.service';

@Component({
  selector: 'app-general-profile',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent, TitleCasePipe],
  templateUrl: './general-profile.component.html',
  styleUrl: './general-profile.component.scss',
})
export class GeneralProfileComponent {
  private userServices = inject(UserService);
  private router = inject(Router);
  userProfile = this.userServices.ownProfileData;
  private localizationService = inject(LocalizationService);
  location = this.localizationService.location;

  goToModifyingGeneral = () => {
    this.router.navigate(['/modify-general']);
  };

  get age() {
    return getAge(this.userProfile().age);
  }

  get sexualPreference() {
    return getSexualPreference(this.userProfile());
  }

  get gender() {
    return getGender(this.userProfile());
  }

  get bio() {
    if (!this.userProfile().bio) {
      return 'NA';
    }
    if (this.userProfile().bio.length > 300) {
      return getBio(this.userProfile().bio.substring(0, 300) + ' ...');
    }
    return getBio(this.userProfile().bio);
  }

  get FameRatingStars(): string {
    return getFameRatingStars(this.userProfile().fameRating);
  }

  get lat(): string {
    if (this.location().latitude === null || this.location().latitude === 999) {
      return 'NA';
    }
    return this.location().latitude.toString();
  }

  get long(): string {
    if (
      this.location().longitude === null ||
      this.location().longitude === 999
    ) {
      return 'NA';
    }
    return this.location().longitude.toString();
  }

  geoLocation = () => {
    this.localizationService.getCurrentPosition();
  };
}
