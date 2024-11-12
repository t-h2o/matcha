import { Component, computed, inject } from '@angular/core';
import { PotentialMatchService } from '../../../shared/services/potentialMatch.service';
import { CardComponent } from '../../../UI/card/card.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pictures',
  standalone: true,
  imports: [CardComponent, NgClass],
  templateUrl: './pictures.component.html',
  styleUrl: './pictures.component.scss',
})
export class PicturesComponent {
  private matchService = inject(PotentialMatchService);
  userPictures = computed(() => this.matchService.otherProfileData().pictures);
}
