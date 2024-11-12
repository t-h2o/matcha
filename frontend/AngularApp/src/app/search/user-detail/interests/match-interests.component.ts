import { Component, computed, inject } from '@angular/core';
import { PotentialMatchService } from '../../../shared/services/potentialMatch.service';

@Component({
  selector: 'app-match-interests',
  standalone: true,
  imports: [],
  templateUrl: './match-interests.component.html',
  styleUrl: './match-interests.component.scss',
})
export class MatchInterestsComponent {
  private matchService = inject(PotentialMatchService);

  user = this.matchService.otherProfileData;
  interests = computed(() => this.user().interests);
}
