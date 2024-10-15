import { Component } from '@angular/core';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CustomButtonComponent, FormsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    console.log(formData.value);
    // formData.form.reset();
  }
}
