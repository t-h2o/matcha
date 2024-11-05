import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { CardComponent } from '../UI/card/card.component';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CardComponent, FormsModule, CustomButtonComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  falseCredentials = signal<boolean>(false);

  onSubmit(formData: NgForm) {
    const loginData: { username: string} = {
      username: formData.value.username,
    };
    this.userService.resetPassword(loginData);
    this.router.navigate(['/login']);
    formData.form.reset();
  }
}
