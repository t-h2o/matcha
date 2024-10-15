import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { PasswordConfirmValidatorDirective } from '../../shared/directives/password-confirm-validator.directive';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CustomButtonComponent,
    FormsModule,
    PasswordConfirmValidatorDirective,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    console.log(formData.value);

    // formData.form.reset();
  }
}
