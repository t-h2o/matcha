import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { UserItemComponent } from './user-item/user-item.component';
import { PotentialMatchService } from '../../shared/services/potentialMatch.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserItemComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  selectedFilter = signal<string>('all');
  private potentialMatchService = inject(PotentialMatchService);
  potentialMatches = this.potentialMatchService.potentialMatches;

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }

  onViewProfile(userId: string) {
    console.log(userId);
  }
}
