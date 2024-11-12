import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { EmailPasswdComponent } from './email-passwd/email-passwd.component';
import { GeneralProfileComponent } from './general-profile/general-profile.component';
import { InterestsComponent } from './interests/interests.component';
import { PicturesProfileComponent } from './pictures-profile/pictures-profile.component';
import { RatingComponent } from './rating/rating.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    GeneralProfileComponent,
    PicturesProfileComponent,
    InterestsComponent,
    EmailPasswdComponent,
    RatingComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private userServices = inject(UserService);

  ngOnInit(): void {
    this.userServices.getInterests();
    this.userServices.getUserProfile();
    this.userServices.getUserPictures();
  }
}
