import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../UI/card/card.component';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';
import { GeneralProfileComponent } from './general-profile/general-profile.component';
import { PicturesProfileComponent } from './pictures-profile/pictures-profile.component';
import { InterestsComponent } from './interests/interests.component';
import { EmailPasswdComponent } from './email-passwd/email-passwd.component';
import { dummyUserData, UserData } from './dummyUserData';
import { ModifyGeneralComponent } from './modify-general/modify-general.component';
import { ModifyInterestsComponent } from './modify-interests/modify-interests.component';
import { ModifyEmailComponent } from './modify-email/modify-email.component';
import { ModifyPicturesComponent } from './modify-pictures/modify-pictures.component';
import { UserService } from '../shared/services/user.service';
import { finalize } from 'rxjs';

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
  interests = signal<{ interests: string[] }>({ interests: [] });

  ngOnInit(): void {
    const subscription = this.userServices
      .getInterests()
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: { interests: string[] }) => {
          this.interests.set(data);
          console.log('Interests from back :', data);
        },
        error: (error: any) => {
          console.log('Error getting interests:', error);
        },
      });
  }
  profileData: UserData = dummyUserData;
  isModifyingGeneral: boolean = false;
  isModifyingInterests: boolean = false;
  isModifyingEmail: boolean = false;
  isModifyingPictures: boolean = false;

  toggleIsModifyingGeneral = () => {
    this.isModifyingGeneral = !this.isModifyingGeneral;
  };

  toggleIModifyInterests = () => {
    this.isModifyingInterests = !this.isModifyingInterests;
  };

  toggleIModifyEmail = () => {
    this.isModifyingEmail = !this.isModifyingEmail;
  };

  toggleIModifyPictures = () => {
    this.isModifyingPictures = !this.isModifyingPictures;
  };
}
