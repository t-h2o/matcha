import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-email-passwd',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent],
  templateUrl: './email-passwd.component.html',
  styleUrl: './email-passwd.component.scss',
})
export class EmailPasswdComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  userEmail = computed(() => this.userService.ownProfileData().email);
  isEmailVerified = computed(
    () => this.userService.ownProfileData().emailVerified,
  );

  goToModifyEmail = () => {
    this.router.navigate(['/modify-email']);
  };

  get Email() {
    if (this.userEmail() === '') {
      return 'No email';
    }
    return this.userEmail();
  }

  get icon() {
    return this.isEmailVerified()
      ? '/icons/check-circle-1.svg'
      : '/icons/xmark-circle.svg';
  }
}
