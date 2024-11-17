import { Component, inject, signal } from '@angular/core';
import { PotentialMatchService } from '../../shared/services/potentialMatch.service';
import { UserItemComponent } from './user-item/user-item.component';
import { UserService } from '../../shared/services/user.service';
import { FilterMatchesPipe } from '../../shared/pipes/filterMatches.pipe';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserItemComponent, FilterMatchesPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  selectedFilter = signal<string>('all');
  private potentialMatchService = inject(PotentialMatchService);
  private userServices = inject(UserService);
  potentialMatches = this.potentialMatchService.potentialMatches;

  currentUser = this.userServices.ownProfileData;

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
