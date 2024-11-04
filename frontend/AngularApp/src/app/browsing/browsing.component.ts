import { Component } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { ResearchComponent } from './research/research.component';

@Component({
  selector: 'app-browsing',
  standalone: true,
  imports: [ResearchComponent, FilterComponent],
  templateUrl: './browsing.component.html',
  styleUrl: './browsing.component.scss',
})
export class BrowsingComponent {}
