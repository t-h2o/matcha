import { Component } from '@angular/core';
import { CardComponent } from '../UI/card/card.component';
import { ResearchComponent } from './research/research.component';

@Component({
  selector: 'app-browsing',
  standalone: true,
  imports: [CardComponent, ResearchComponent],
  templateUrl: './browsing.component.html',
  styleUrl: './browsing.component.scss',
})
export class BrowsingComponent {}
