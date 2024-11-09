import { Component, inject, OnInit } from '@angular/core';
import { ResearchComponent } from './research/research.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-browsing',
  standalone: true,
  imports: [ResearchComponent, UserListComponent],
  templateUrl: './browsing.component.html',
  styleUrl: './browsing.component.scss',
})
export class BrowsingComponent implements OnInit {
  ngOnInit(): void {
    this.userServices.getAllUsers();
  }
  private userServices = inject(UserService);
}
