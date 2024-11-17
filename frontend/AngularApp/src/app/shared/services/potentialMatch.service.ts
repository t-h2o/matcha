import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { PossibleMatchesUserData, UserData } from '../models/data-to-api/user';
import { emptyUser } from '../models/emptyUser';
import { ErrorService } from './error.service';
import { UserRequestsService } from './user.requests.service';

@Injectable({
  providedIn: 'root',
})
export class PotentialMatchService {
  private userRequestsService = inject(UserRequestsService);
  private errorService = inject(ErrorService);

  potentialMatches = signal<PossibleMatchesUserData[]>([]);
  otherProfileData = signal<UserData>(emptyUser);

  getAllPotentialMatches() {
    const subscription = this.userRequestsService
      .getPotentialMatches()
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: PossibleMatchesUserData[]) => {
          this.potentialMatches.set(data);
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.errorService.showError(errorMessage);
        },
      });
  }

  getUserProfileByUsername(username: string) {
    const subscription = this.userRequestsService
      .getUserByUsername(username)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: UserData) => {
          console.log('data: ' + JSON.stringify(data));
          this.otherProfileData.set(data);
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.errorService.showError(errorMessage);
        },
      });
  }

  viewProfile(username: string) {
    const subscription = this.userRequestsService
      .visitProfile(username)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: () => {},
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.errorService.showError(errorMessage);
        },
      });
  }
}
