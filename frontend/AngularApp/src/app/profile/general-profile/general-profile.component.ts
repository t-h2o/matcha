import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { getAge, getBio, getGender, getSexualPreference } from '../../shared/utils/displayUtils';

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
