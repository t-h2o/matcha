import { Component, computed, inject, signal } from '@angular/core';
import { UserItemComponent } from './user-item/user-item.component';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserItemComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  selectedFilter = signal<string>('all');
  private userServices = inject(UserService);
  possibleMatches = this.userServices.possibleMatches;

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }

  onViewProfile(userId: string) {
    console.log(userId);
  }
}
