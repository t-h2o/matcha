import { Component, computed, inject } from '@angular/core';
import { CardComponent } from '../../UI/card/card.component';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  user = this.userService.ownProfileData;
  likeByList = computed(() => this.user().likedBy);
  visitedByList = computed(() => this.user().visitedBy);

  onClickHandler(username: string) {
    this.router.navigate(['search', username]);
  }
}
