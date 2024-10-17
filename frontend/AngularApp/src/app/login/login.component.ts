import { Component, inject } from '@angular/core';
import { CardComponent } from '../UI/card/card.component';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private httpClient = inject(HttpClient);
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
