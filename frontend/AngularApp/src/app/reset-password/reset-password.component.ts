import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { UserService } from '../shared/services/user.service';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CustomButtonComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  falseCredentials = signal<boolean>(false);

  onSubmit(formData: NgForm) {
    const loginData: { username: string } = {
      username: formData.value.username,
    };
    this.userService.resetPassword(loginData);
    this.toastService.show('Password reset link sent to your email', 'success');
    setTimeout(() => {
      this.router.navigate(['/profile']);
    }, 2000);
    formData.form.reset();
  }
}
