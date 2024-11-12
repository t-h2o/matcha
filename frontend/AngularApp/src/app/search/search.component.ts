import { Component, inject, OnInit } from '@angular/core';
import { PotentialMatchService } from '../shared/services/potentialMatch.service';
import { ResearchComponent } from './research/research.component';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ResearchComponent, UserListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  private potentialMatchService = inject(PotentialMatchService);

  ngOnInit(): void {
    this.potentialMatchService.getAllPotentialMatches();
  }
}
