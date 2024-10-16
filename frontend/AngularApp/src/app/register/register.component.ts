import { Component, inject } from '@angular/core';
import { CardComponent } from '../UI/card/card.component';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordConfirmValidatorDirective } from '../shared/directives/password-confirm-validator.directive';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';
import { HttpClient } from '@angular/common/http';
import { UserRegister } from '../shared/models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CardComponent,
    CustomButtonComponent,
    FormsModule,
    PasswordConfirmValidatorDirective,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private httpClient = inject(HttpClient);
  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      Object.keys(formData.controls).forEach((field) => {
        const control = formData.controls[field];
        if (control.invalid) {
          console.log(`${field} is invalid`);
        }
      });
      return;
    }
    const userData: UserRegister = {
      firstname: formData.value.firstname,
      lastname: formData.value.lastname,
      username: formData.value.username,
      email: formData.value.email,
      password: formData.value.password,
    };
    console.log(userData);
    this.sendUserDataToAPI(userData);
    formData.form.reset();
  }

  sendUserDataToAPI(userData: UserRegister) {
    const subscription = this.httpClient
      .post('http://localhost:5001/register', userData)
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
