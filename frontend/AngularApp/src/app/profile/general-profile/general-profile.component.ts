import { Component, Input } from '@angular/core';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { CardComponent } from '../../UI/card/card.component';
import { UserData } from '../dummyUserData';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-general-profile',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent, UpperCasePipe],
  templateUrl: './general-profile.component.html',
  styleUrl: './general-profile.component.scss',
})
export class GeneralProfileComponent {
  @Input() userProfile!: UserData;
  @Input() onModify!: () => void;

  onClickModify() {
    this.onModify();
  }
}
