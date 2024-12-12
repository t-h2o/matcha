import { Component, inject, OnInit } from '@angular/core';
import { PotentialMatchService } from '../shared/services/potentialMatch.service';
import { UserService } from '../shared/services/user.service';
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
  private userServices = inject(UserService);

  ngOnInit(): void {
    this.userServices.getUserProfile();
    this.potentialMatchService.getAllPotentialMatches();
  }
}
