import { Component, computed, inject } from '@angular/core';
import { PotentialMatchService } from '../../../shared/services/potentialMatch.service';
import { CardComponent } from '../../../UI/card/card.component';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss',
})
export class InterestsComponent {
  private matchService = inject(PotentialMatchService);

  user = this.matchService.otherProfileData;
  interests = computed(() => this.user().interests);
}
