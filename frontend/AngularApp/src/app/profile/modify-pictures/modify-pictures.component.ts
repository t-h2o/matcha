import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modify-pictures',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modify-pictures.component.html',
  styleUrl: './modify-pictures.component.scss',
})
export class ModifyPicturesComponent {
  @Input() userPictures!: string[];
  @Input() profilePicture!: string;
  @Input() onCancel!: () => void;
}
