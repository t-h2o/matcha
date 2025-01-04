import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent implements OnInit {
  private userServices = inject(UserService);
  private token: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    if (this.token.length > 15) {
      this.verifyToken();
    }
  }

  private verifyToken() {
    this.userServices.verifyEmailToken(this.token);
  }
}
