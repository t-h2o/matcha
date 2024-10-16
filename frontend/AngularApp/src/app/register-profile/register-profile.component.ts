import { Component } from '@angular/core';
import { RegisterProfileFormComponent } from './register-profile-form/register-profile-form.component';
import { CardComponent } from '../UI/card/card.component';

@Component({
  selector: 'app-register-profile',
  standalone: true,
  imports: [RegisterProfileFormComponent, CardComponent],
  templateUrl: './register-profile.component.html',
  styleUrl: './register-profile.component.scss',
})
export class RegisterProfileComponent {}
