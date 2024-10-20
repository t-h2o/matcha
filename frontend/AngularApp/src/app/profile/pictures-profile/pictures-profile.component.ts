import { Component } from '@angular/core';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-pictures-profile',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent],
  templateUrl: './pictures-profile.component.html',
  styleUrl: './pictures-profile.component.scss'
})
export class PicturesProfileComponent {

}
