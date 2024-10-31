import { Component, computed, effect, input, Input } from '@angular/core';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss',
})
export class InterestsComponent {
  interestList = input.required<{ interests: string[] }>();
  @Input({ required: true }) onModify!: () => void;

  interests = computed(() => this.interestList().interests);
}
