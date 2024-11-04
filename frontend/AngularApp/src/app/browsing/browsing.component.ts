import { Component } from '@angular/core';
import { ResearchComponent } from './research/research.component';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-browsing',
  standalone: true,
  imports: [ResearchComponent, UserListComponent],
  templateUrl: './browsing.component.html',
  styleUrl: './browsing.component.scss',
})
export class BrowsingComponent {}
