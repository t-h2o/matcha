import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';
import { AuthService } from '../shared/services/auth.service';
import { HttpRequestsService } from '../shared/services/http.requests.service';
import { SocketService } from '../shared/services/socket.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CustomButtonComponent, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private httpService = inject(HttpRequestsService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private socketService = inject(SocketService);
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
    const subscription = this.httpService.login(loginData).subscribe({
      next: (data) => {
        sessionStorage.setItem('access_token', data.access_token);
        this.authService.tokenSignal.set(data);
        this.socketService.initializeSocket(data.access_token);
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.falseCredentials.set(true);
        }
      },
      complete: () => {
        subscription.unsubscribe();
      },
    });
  }
}
