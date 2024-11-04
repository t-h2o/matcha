import { Component, computed, inject, Input } from '@angular/core';
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
  userPictures = computed(() => this.userService.profileData().pictures);
  profilePicture = computed(
    () => this.userService.profileData().profilePicture,
  );

  get proPicture() {
    return this.profilePicture();
  }

  setProfilePicture(pictureUrl: string) {
    this.userService.modifyProfilePicture(pictureUrl);
  }
}
