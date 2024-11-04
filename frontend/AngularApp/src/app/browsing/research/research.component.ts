import { Component, signal } from '@angular/core';
import { CardComponent } from '../../UI/card/card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CardComponent, FormsModule],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss',
})
export class ResearchComponent {
  maxAgeGap = signal<number>(0);
  maxDistance = signal<number>(0);
  maxFameGap = signal<number>(0);

  getDistanceLabel(): string {
    return this.maxDistance() >= 101 ? '100+' : this.maxDistance().toString();
  }
}
