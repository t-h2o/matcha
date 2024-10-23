import { Component, inject, signal } from '@angular/core';
import { CardComponent } from '../UI/card/card.component';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { token } from '../shared/models/token';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);
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
    const subscription = this.httpClient
      .post<token>('http://localhost:5001/login', loginData)
      .subscribe({
        next: (data) => {
          this.authService.tokenSignal.set(data);
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
