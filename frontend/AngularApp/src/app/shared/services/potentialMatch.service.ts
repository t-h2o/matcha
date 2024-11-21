import { inject, Injectable, signal } from '@angular/core';
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
    this.httpService.getPotentialMatches().subscribe({
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
    this.httpService.getUserByUsername(username).subscribe({
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
    this.httpService.visitProfile(username).subscribe({
      next: () => {},
      error: (error: any) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }

  likeUser(username: string) {
    const subscription = this.httpService
      .likeUser(username)
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
