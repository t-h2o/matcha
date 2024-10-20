import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../UI/card/card.component';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CardComponent, FormsModule, CustomButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
