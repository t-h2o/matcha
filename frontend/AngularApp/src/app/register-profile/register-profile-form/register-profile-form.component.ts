import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-profile-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-profile-form.component.html',
  styleUrl: './register-profile-form.component.scss'
})
export class RegisterProfileFormComponent {

  onSubmit(formData: NgForm) {
    // Handle submit
  }

  onFileChange(event: Event) {
    // Handle submit
  }
}
