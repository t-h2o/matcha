import { Component, Input } from '@angular/core';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pictures-profile',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent, NgClass],
  templateUrl: './pictures-profile.component.html',
  styleUrl: './pictures-profile.component.scss',
})
export class PicturesProfileComponent {
  @Input() userPictures!: string[];
  @Input() profilePicture!: string;
}
