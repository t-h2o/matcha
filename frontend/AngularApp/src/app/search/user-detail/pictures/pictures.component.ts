import { Component, computed, inject } from '@angular/core';
import { PotentialMatchService } from '../../../shared/services/potentialMatch.service';

@Component({
  selector: 'app-pictures',
  standalone: true,
  imports: [],
  templateUrl: './pictures.component.html',
  styleUrl: './pictures.component.scss',
})
export class PicturesComponent {
  private matchService = inject(PotentialMatchService);
  user = this.matchService.otherProfileData;

  userPictures = computed(() => {
    return this.user().pictures;
  });
}
