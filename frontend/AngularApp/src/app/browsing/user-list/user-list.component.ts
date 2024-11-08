import { Component, signal } from '@angular/core';
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

  users = [
    {
      username: 'roburi',
      name: 'John',
      age: 25,
      location: 'New York',
      fameRating: 4.5,
      interests: ['Music', 'Sports', 'Travel'],
    },
    {
      username: 'Jane123',
      name: 'Jane',
      age: 22,
      location: 'Los Angeles',
      fameRating: 4.0,
      interests: ['Art', 'Reading', 'Movies'],
    },
  ];

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }

  onViewProfile(userId: string) {
    console.log(userId);
  }
}
