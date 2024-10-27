import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { PasswordConfirmValidatorDirective } from '../../shared/directives/password-confirm-validator.directive';
import { finalize } from 'rxjs';
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
export class ModifyEmailComponent implements OnInit {
  @Input({ required: true }) onCancel!: () => void;
  @Input({ required: true }) userEmail!: string;
  private userService = inject(UserService);

  uEmail: string = '';

  ngOnInit(): void {
    this.uEmail = this.userEmail;
  }

  onSubmitEmail(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const modifiedUserData: ModifiedUserEmail = {
      email: this.uEmail,
    };
    this.sendUserEmailToAPI(modifiedUserData);
    this.onCancel();
  }

  onSubmitPassword(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const modifiedUserData: ModifiedUserPassword = {
      currentPassword: form.value.currentPassword,
      newPassword: form.value.newPassword,
    };
    this.sendUserPasswordToAPI(modifiedUserData);
    this.onCancel();
  }

  private sendUserEmailToAPI(userData: ModifiedUserEmail) {
    const subscription = this.userService
      .modifyEmail(userData)
      .pipe(
        finalize(() => {
          subscription.unsubscribe();
        }),
      )
      .subscribe({
        next: (data: any) => {
          console.log('data: ' + JSON.stringify(data));
        },
        error: (error: any) => {
          console.error('error: ' + JSON.stringify(error));
        },
      });
  }

  private sendUserPasswordToAPI(userData: ModifiedUserPassword) {
    const subscription = this.userService
      .modifyPassword(userData)
      .pipe(
        finalize(() => {
          subscription.unsubscribe();
        }),
      )
      .subscribe({
        next: (data: any) => {
          console.log('data: ' + JSON.stringify(data));
        },
        error: (error: any) => {
          console.error('error: ' + JSON.stringify(error));
        },
      });
  }
}
