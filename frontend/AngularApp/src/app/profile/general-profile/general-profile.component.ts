import { Component, inject, Input } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

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

  goToModifyingGeneral = () => {
    this.router.navigate(['/modify-general']);
  };

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
