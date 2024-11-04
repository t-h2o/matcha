import { Component, signal } from '@angular/core';
import { CardComponent } from '../../UI/card/card.component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CardComponent, FormsModule, NgClass],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss',
})
export class ResearchComponent {
  isExpanded = signal<boolean>(false);
  maxAgeGap = signal<number>(0);
  maxDistance = signal<number>(0);
  maxFameGap = signal<number>(0);
  commonTags = signal<string[]>([]);

  toggleForm(): void {
    this.isExpanded.set(!this.isExpanded());
  }

  getDistanceLabel(): string {
    return this.maxDistance() >= 101 ? '100+' : this.maxDistance().toString();
  }
}
