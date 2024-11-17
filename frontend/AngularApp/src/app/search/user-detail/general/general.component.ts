import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PotentialMatchService } from '../../../shared/services/potentialMatch.service';
import {
  getAge,
  getSexualPreference,
  getGender,
  getBio,
} from '../../../shared/utils/displayUtils';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss',
})
export class GeneralComponent {
  private matchService = inject(PotentialMatchService);
  userProfile = this.matchService.otherProfileData;

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
    return getBio(this.userProfile().bio);
  }
}
