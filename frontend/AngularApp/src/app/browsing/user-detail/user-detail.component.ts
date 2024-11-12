import { Component, inject, input, OnInit } from '@angular/core';
import { PotentialMatchService } from '../../shared/services/potentialMatch.service';
import { GeneralComponent } from './general/general.component';
import { MatchInterestsComponent } from './interests/match-interests.component';
import { PicturesComponent } from './pictures/pictures.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatchInterestsComponent, GeneralComponent, PicturesComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  private PotentialMatchService = inject(PotentialMatchService);
  username = input.required<string>();
  user = this.PotentialMatchService.otherProfileData;

  ngOnInit(): void {
    this.PotentialMatchService.getUserProfileByUsername(this.username());
  }
}
