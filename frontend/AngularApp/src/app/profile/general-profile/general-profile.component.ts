import { Component } from '@angular/core';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { CardComponent } from '../../UI/card/card.component';

@Component({
  selector: 'app-general-profile',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent],
  templateUrl: './general-profile.component.html',
  styleUrl: './general-profile.component.scss'
})
export class GeneralProfileComponent {

}
