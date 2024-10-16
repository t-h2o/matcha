import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterProfileFormComponent } from './register-profile-form/register-profile-form.component';
import { CardComponent } from '../UI/card/card.component';

@Component({
  selector: 'app-register-profile',
  standalone: true,
  imports: [RegisterProfileFormComponent, CardComponent],
  templateUrl: './register-profile.component.html',
  styleUrl: './register-profile.component.scss',
})
<<<<<<< HEAD
export class RegisterProfileComponent {}
=======
export class RegisterProfileComponent {
  onSubmit(formData: NgForm) {
    // Handle submit
  }

  onFileChange(event: Event) {
    // Handle submit
  }
}
>>>>>>> 292b043 (add register-profile-form base)
