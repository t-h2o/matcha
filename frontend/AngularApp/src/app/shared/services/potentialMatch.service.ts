import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { PossibleMatchesUserData, UserData } from '../models/data-to-api/user';
import { emptyUser } from '../models/emptyUser';
import { HttpRequestsService } from './http.requests.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class PotentialMatchService {
  private httpService = inject(HttpRequestsService);
  private toastService = inject(ToastService);

  potentialMatches = signal<PossibleMatchesUserData[]>([]);
  otherProfileData = signal<UserData>(emptyUser);

  getAllPotentialMatches() {
    const subscription = this.httpService
      .getPotentialMatches()
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: PossibleMatchesUserData[]) => {
          this.potentialMatches.set(data);
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }

  getUserProfileByUsername(username: string) {
    const subscription = this.httpService
      .getUserByUsername(username)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: UserData) => {
          console.log('data: ' + JSON.stringify(data));
          this.otherProfileData.set(data);
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }

  viewProfile(username: string) {
    const subscription = this.httpService
      .visitProfile(username)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: () => {},
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }
}
