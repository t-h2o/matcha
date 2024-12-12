import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-pictures-profile',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent, NgClass],
  templateUrl: './pictures-profile.component.html',
  styleUrl: './pictures-profile.component.scss',
})
export class PicturesProfileComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  userPictures = computed(() => this.userService.ownProfileData().pictures);
  profilePicture = computed(() => this.userService.ownProfileData().urlProfile);

  goToAddPictures = () => {
    this.router.navigate(['/add-pictures']);
  };

  get proPicture() {
    return this.profilePicture();
  }

  setProfilePicture(pictureUrl: string) {
    this.userService.modifyProfilePicture(pictureUrl);
  }
}
