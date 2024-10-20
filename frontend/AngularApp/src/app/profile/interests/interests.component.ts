import { Component } from '@angular/core';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { CardComponent } from '../../UI/card/card.component';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})
export class InterestsComponent {

}
