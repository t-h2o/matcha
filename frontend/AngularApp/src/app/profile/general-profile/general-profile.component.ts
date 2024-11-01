import { Component, inject, Input } from '@angular/core';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { CardComponent } from '../../UI/card/card.component';
import { UserData } from '../dummyUserData';
import { UpperCasePipe } from '@angular/common';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-general-profile',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent, UpperCasePipe],
  templateUrl: './general-profile.component.html',
  styleUrl: './general-profile.component.scss',
})
export class GeneralProfileComponent {
  @Input() onModify!: () => void;
  private userServices = inject(UserService);
  userProfile = this.userServices.profileData;

  onClickModify() {
    this.onModify();
  }

  get sexualPreference() {
    if (this.userProfile().sexualPreference === 'e') {
      return 'Heterosexual';
    }
    if (this.userProfile().sexualPreference === 'o') {
      return 'Homosexual';
    }
    return 'Bisexual';
  }

  get gender() {
    if (this.userProfile().gender === 'm') {
      return 'Male';
    }
    return 'Female';
  }
}
