import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CustomButtonComponent, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

}
