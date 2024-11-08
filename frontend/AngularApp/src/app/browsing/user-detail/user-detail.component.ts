import { Component, inject, input, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  private userService = inject(UserService);
  username = input.required<string>();
  user = this.userService.otherProfileData();

  ngOnInit(): void {
    this.userService.getUserProfileByUsername(this.username());
  }
}
