import { Component, inject, Input } from '@angular/core';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { NgClass } from '@angular/common';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-pictures-profile',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent, NgClass],
  templateUrl: './pictures-profile.component.html',
  styleUrl: './pictures-profile.component.scss',
})
export class PicturesProfileComponent {
  @Input() onModify!: () => void;
  private userService = inject(UserService);
  userPictures = this.userService.profileData().pictures;
  profilePicture = this.userService.profileData().profilePicture;
}
