import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { PasswordConfirmValidatorDirective } from '../../shared/directives/password-confirm-validator.directive';
import { RouterModule } from '@angular/router';
import { UserRegister } from '../../shared/models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CustomButtonComponent,
    FormsModule,
    PasswordConfirmValidatorDirective,
    RouterModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
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
