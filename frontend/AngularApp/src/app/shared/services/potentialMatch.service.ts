import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { OtherUserData, PossibleMatchesUserData, UserData } from '../models/data-to-api/user';
import { emptyUser } from '../models/emptyUser';
import { UserRequestsService } from './user.requests.service';

@Injectable({
  providedIn: 'root',
})
export class PotentialMatchService {
  private userRequestsService = inject(UserRequestsService);

  potentialMatches = signal<PossibleMatchesUserData[]>([]);
  otherProfileData = signal<UserData>(emptyUser);


  getAllPotentialMatches() {
    const subscription = this.userRequestsService
      .getPotentialMatches()
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: PossibleMatchesUserData[]) => {
          console.log('data: ' + JSON.stringify(data));
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
          this.otherProfileData.update((prev) => {
            return {
              ...prev,
              username: data.username,
              firstname: data.firstname,
              lastname: data.lastname,
              selectedGender: data.selectedGender,
              sexualPreference: data.sexualPreference,
              bio: data.bio,
              age: data.age,
              fameRating: data.fameRating,
              urlProfile: data.urlProfile,
            };
          });
        },
        error: (error: any) => {
          console.log('Error getting user profile:', error);
        },
      });
  }
}
