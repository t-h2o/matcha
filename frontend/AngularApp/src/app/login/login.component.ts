import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserRequestsService } from '../shared/services/user.requests.service';
import { CardComponent } from '../UI/card/card.component';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private userService = inject(UserRequestsService);
  private authService = inject(AuthService);
  private router = inject(Router);
  falseCredentials = signal<boolean>(false);

  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    const loginData: { username: string; password: string } = {
      username: formData.value.username,
      password: formData.value.password,
    };
    this.sendLoginDataToAPI(loginData);
    formData.form.reset();
  }

  sendLoginDataToAPI(loginData: { username: string; password: string }) {
    this.falseCredentials.set(false);
    const subscription = this.userService.login(loginData).subscribe({
      next: (data) => {
        sessionStorage.setItem('access_token', data.access_token);
        this.authService.tokenSignal.set(data);
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.falseCredentials.set(true);
        }
        console.error(error.status);
      },
      complete: () => {
        subscription.unsubscribe();
      },
    });
  }
}
