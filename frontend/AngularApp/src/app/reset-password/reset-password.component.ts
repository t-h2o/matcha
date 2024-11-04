import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { CardComponent } from '../UI/card/card.component';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CardComponent, FormsModule, CustomButtonComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private userService = inject(UserService);
  falseCredentials = signal<boolean>(false);

  onSubmit(formData: NgForm) {
    const loginData: { username: string } = {
      username: formData.value.username,
    };
    this.userService.resetPassword(loginData);
    formData.form.reset();
  }
}
