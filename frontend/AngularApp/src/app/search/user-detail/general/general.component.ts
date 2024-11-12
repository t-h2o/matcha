import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PotentialMatchService } from '../../../shared/services/potentialMatch.service';

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
    if (!this.userProfile().age || this.userProfile().age === '') {
      return 'NOT SPECIFIED';
    }
    return this.userProfile().age;
  }

  get sexualPreference() {
    if (this.userProfile().sexualPreference === 'e') {
      return 'Heterosexual';
    }
    if (this.userProfile().sexualPreference === 'o') {
      return 'Homosexual';
    }
    if (this.userProfile().sexualPreference === 'b') {
      return 'Bisexual';
    }
    return 'NOT SPECIFIED';
  }

  get gender() {
    if (this.userProfile().selectedGender === 'm') {
      return 'Male';
    }
    if (this.userProfile().selectedGender === 'f') {
      return 'Female';
    }
    return 'NOT SPECIFIED';
  }

  get bio() {
    if (!this.userProfile().bio || this.userProfile().bio === '') {
      return 'EMPTY';
    }
    return this.userProfile().bio;
  }
}
