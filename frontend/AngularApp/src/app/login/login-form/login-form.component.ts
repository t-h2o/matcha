import { Component, inject } from '@angular/core';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CustomButtonComponent, FormsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private httpClient = inject(HttpClient);
  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    const loginData: { username: string; password: string } = {
      username: formData.value.username,
      password: formData.value.password,
    };
    console.log(loginData);
    formData.form.reset();
  }

  sendLoginDataToAPI(loginData: { username: string; password: string }) {
    const subscription = this.httpClient
      .post('http://localhost:5001/login', loginData)
      .subscribe({
        next: (data) => {
          console.log('data: ' + JSON.stringify(data));
        },
        error: (error) => {
          console.error('error: ' + JSON.stringify(error));
        },
        complete: () => {
          subscription.unsubscribe();
        },
      });
  }
}
