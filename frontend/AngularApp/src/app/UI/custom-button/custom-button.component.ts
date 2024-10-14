import { Component, Input } from '@angular/core';

@Component({
  selector: '[custom-button]',
  standalone: true,
  imports: [],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {
  @Input() color: "primary" | "negative" = "primary";
}
