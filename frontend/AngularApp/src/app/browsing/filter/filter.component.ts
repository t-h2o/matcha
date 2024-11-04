import { Component } from '@angular/core';
import { CardComponent } from '../../UI/card/card.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {}
