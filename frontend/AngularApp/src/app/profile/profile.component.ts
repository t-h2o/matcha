import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { CardComponent } from '../UI/card/card.component';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';
import { EmailPasswdComponent } from './email-passwd/email-passwd.component';
import { GeneralProfileComponent } from './general-profile/general-profile.component';
import { InterestsComponent } from './interests/interests.component';
import { ModifyEmailComponent } from './modify-email/modify-email.component';
import { ModifyGeneralComponent } from './modify-general/modify-general.component';
import { ModifyInterestsComponent } from './modify-interests/modify-interests.component';
import { ModifyPicturesComponent } from './modify-pictures/modify-pictures.component';
import { PicturesProfileComponent } from './pictures-profile/pictures-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CardComponent,
    CustomButtonComponent,
    GeneralProfileComponent,
    PicturesProfileComponent,
    InterestsComponent,
    EmailPasswdComponent,
    ModifyGeneralComponent,
    ModifyInterestsComponent,
    ModifyEmailComponent,
    ModifyPicturesComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private userServices = inject(UserService);
  interests = this.userServices.interestList;
  userData = this.userServices.profileData;

  ngOnInit(): void {
    this.userServices.getInterests();
    this.userServices.getUserProfile();
  }
  isModifyingGeneral = signal<boolean>(false);
  isModifyingInterests = signal<boolean>(false);
  isModifyingEmail = signal<boolean>(false);
  isModifyingPictures = signal<boolean>(false);

  toggleIsModifyingGeneral = () => {
    this.isModifyingGeneral.set(!this.isModifyingGeneral());
  };

  toggleIModifyInterests = () => {
    this.isModifyingInterests.set(!this.isModifyingInterests());
  };

  toggleIModifyEmail = () => {
    this.isModifyingEmail.set(!this.isModifyingEmail());
  };

  toggleIModifyPictures = () => {
    this.isModifyingPictures.set(!this.isModifyingPictures());
  };
}
