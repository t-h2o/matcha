import { Component } from '@angular/core';
import { CardComponent } from '../UI/card/card.component';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';
import { GeneralProfileComponent } from './general-profile/general-profile.component';
import { PicturesProfileComponent } from './pictures-profile/pictures-profile.component';
import { InterestsComponent } from './interests/interests.component';
import { EmailPasswdComponent } from './email-passwd/email-passwd.component';
import { dummyUserData, UserData } from './dummyUserData';
import { ModifyGeneralComponent } from './modify-general/modify-general.component';
import { ModifyInterestsComponent } from './modify-interests/modify-interests.component';

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
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profileData: UserData = dummyUserData;
  isModifyingGeneral: boolean = false;
  isModifyingInterests: boolean = false;

  toggleIsModifyingGeneral = () => {
    this.isModifyingGeneral = !this.isModifyingGeneral;
  };

  toggleIModifyInterests = () => {
    console.log('toggleIModifyInterests');
    this.isModifyingInterests = !this.isModifyingInterests;
  };
}
