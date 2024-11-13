import { Component, inject, signal } from '@angular/core';
import { PotentialMatchService } from '../../shared/services/potentialMatch.service';
import { UserItemComponent } from './user-item/user-item.component';

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
}
