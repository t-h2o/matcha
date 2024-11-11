import { Component, computed, inject, Input } from '@angular/core';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss',
})
export class InterestsComponent {
  private router = inject(Router);
  private userServices = inject(UserService);

  interestList = this.userServices.interestList;
  interests = computed(() => this.interestList().interests);

  goToModifyInterests = () => {
    this.router.navigate(['/modify-interests']);
  };
}
