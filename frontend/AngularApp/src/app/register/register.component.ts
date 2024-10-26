import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordConfirmValidatorDirective } from '../shared/directives/password-confirm-validator.directive';
import { UserRegister } from '../shared/models/data-to-api/user';
import { UserService } from '../shared/services/user.service';
import { CardComponent } from '../UI/card/card.component';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';

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
  private userService = inject(UserService);

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

  private sendUserDataToAPI(userData: UserRegister) {
    const subscription = this.userService.register(userData).subscribe({
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
