import { Component, Input } from '@angular/core';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { CardComponent } from '../../UI/card/card.component';

@Component({
  selector: 'app-email-passwd',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent],
  templateUrl: './email-passwd.component.html',
  styleUrl: './email-passwd.component.scss',
})
export class EmailPasswdComponent {
  @Input({required: true}) email!: string;
}
