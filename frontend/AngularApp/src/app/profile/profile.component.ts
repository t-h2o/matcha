import { Component } from '@angular/core';
import { CardComponent } from '../UI/card/card.component';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';
import { GeneralProfileComponent } from './general-profile/general-profile.component';
import { PicturesProfileComponent } from './pictures-profile/pictures-profile.component';
import { InterestsComponent } from './interests/interests.component';
import { EmailPasswdComponent } from './email-passwd/email-passwd.component';
import { dummyUserData, UserData } from './dummyUserData';
import { ModifyGeneralComponent } from './modify-general/modify-general.component';

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
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profileData: UserData = dummyUserData;
  isModifyingGeneral: boolean = false;

  onCancelModifyGeneral = () => {
    console.log('onCancelModifyGeneral general profile');
    this.isModifyingGeneral = false;
    console.log(this.isModifyingGeneral);
  };

  onOpenModifyGeneral = () => {
    console.log('onOpenModifyGeneral general profile');
    console.log('before: ' + this.isModifyingGeneral);
    this.isModifyingGeneral = true;
    console.log('after: ' + this.isModifyingGeneral);
  };
}
