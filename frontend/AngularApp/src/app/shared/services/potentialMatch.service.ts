import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import {
  OtherUserData,
  PossibleMatchesUserData,
} from '../models/data-to-api/user';
import { emptyOtherUser } from '../models/emptyUser';
import { UserRequestsService } from './user.requests.service';

@Injectable({
  providedIn: 'root',
})
export class PotentialMatchService {
  private userRequestsService = inject(UserRequestsService);

  potentialMatches = signal<PossibleMatchesUserData[]>([]);
  otherProfileData = signal<OtherUserData>(emptyOtherUser);

  getAllPotentialMatches() {
    const subscription = this.userRequestsService
      .getPotentialMatches()
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: PossibleMatchesUserData[]) => {
          this.potentialMatches.set(data);
        },
        error: (error: any) => {
          console.log('Error getting potential matches:', error);
        },
      });
  }

  getUserProfileByUsername(username: string) {
    const subscription = this.userRequestsService
      .getUserByUsername(username)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: OtherUserData) => {
          console.log('data: ' + JSON.stringify(data));
          this.otherProfileData.set(data);
        },
        error: (error: any) => {
          console.log('Error getting user profile:', error);
        },
      });
  }
}
