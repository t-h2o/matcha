import { Component, computed, inject, signal } from '@angular/core';
import { PotentialMatchService } from '../../shared/services/potentialMatch.service';
import { UserItemComponent } from './user-item/user-item.component';
import { UserService } from '../../shared/services/user.service';
import { FilterMatchesPipe } from '../../shared/pipes/filterMatches.pipe';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserItemComponent, FilterMatchesPipe, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  private potentialMatchService = inject(PotentialMatchService);
  private userServices = inject(UserService);
  potentialMatches = this.potentialMatchService.potentialMatches;
  selectedFilter = this.potentialMatchService.potentialMatchFilter;
  currentUser = computed(() => this.userServices.ownProfileData());

  onChangeTasksFilter(filter: string) {
    this.potentialMatchService.potentialMatchFilter.set(filter);
  }
}
