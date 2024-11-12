import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { PossibleMatchesUserData } from '../models/data-to-api/user';
import { UserRequestsService } from './user.requests.service';

@Injectable({
  providedIn: 'root',
})
export class PotentialMatchService {
  private userRequestsService = inject(UserRequestsService);

  potentialMatches = signal<PossibleMatchesUserData[]>([]);

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
}
