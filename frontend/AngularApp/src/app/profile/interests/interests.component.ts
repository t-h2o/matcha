import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { UserService } from '../../shared/services/user.service';

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

  ownProfile = this.userServices.ownProfileData;
  interestList = computed(() => this.ownProfile().interests);

  goToModifyInterests = () => {
    this.router.navigate(['/modify-interests']);
  };
}
