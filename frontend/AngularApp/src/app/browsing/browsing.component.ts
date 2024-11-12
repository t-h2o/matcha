import { Component, inject, OnInit } from '@angular/core';
import { PotentialMatchService } from '../shared/services/potentialMatch.service';
import { ResearchComponent } from './research/research.component';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-browsing',
  standalone: true,
  imports: [ResearchComponent, UserListComponent],
  templateUrl: './browsing.component.html',
  styleUrl: './browsing.component.scss',
})
export class BrowsingComponent implements OnInit {
  private potentialMatchService = inject(PotentialMatchService);

  ngOnInit(): void {
    this.potentialMatchService.getAllPotentialMatches();
  }
}
