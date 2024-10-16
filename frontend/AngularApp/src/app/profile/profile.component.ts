import { Component } from '@angular/core';
import { CardComponent } from '../UI/card/card.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
