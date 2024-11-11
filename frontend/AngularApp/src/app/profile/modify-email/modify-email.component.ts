import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { PasswordConfirmValidatorDirective } from '../../shared/directives/password-confirm-validator.directive';
import {
  ModifiedUserEmail,
  ModifiedUserPassword,
} from '../../shared/models/data-to-api/user';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-modify-email',
  standalone: true,
  imports: [
    FormsModule,
    CardComponent,
    CustomButtonComponent,
    PasswordConfirmValidatorDirective,
  ],
  templateUrl: './modify-email.component.html',
  styleUrl: './modify-email.component.scss',
})
export class ModifyEmailComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  userEmail = this.userService.ownProfileData().email;

  uEmail: string = '';

  goBack() {
    this.router.navigate(['/profile']);
  }

  onSubmitEmail(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const modifiedUserData: ModifiedUserEmail = {
      email: this.uEmail,
    };
    this.userService.modifyEmail(modifiedUserData);
    form.form.reset();
    this.goBack();
  }

  onSubmitPassword(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const modifiedUserData: ModifiedUserPassword = {
      currentPassword: form.value.curPassword,
      newPassword: form.value.nPassword,
    };
    this.userService.modifyPassword(modifiedUserData);
    form.form.reset();
    this.goBack();
  }
}
