import { inject, Injectable, signal } from '@angular/core';
import {
  FilterPotentialMatch,
  PossibleMatchesUserData,
  UserData,
} from '../models/data-to-api/user';
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
  potentialMatchFilter = signal<FilterPotentialMatch>({
    ageGap: 5,
    fameGap: 2,
    distance: 10,
    interests: [],
  });

  getAllPotentialMatches() {
    this.httpService
      .filterPotentialMatches(this.potentialMatchFilter())
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

  toggleLike(payload: { dislike: string } | { like: string }) {
    this.httpService.toggleLike(payload).subscribe({
      next: (data: { isLiked: boolean }) => {
        this.otherProfileData.update((prev) => {
          return {
            ...prev,
            isLiked: data.isLiked,
          };
        });
      },
      error: (error: any) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }

  filterPotentialMatches(filterPotentialMatch: FilterPotentialMatch) {
    this.httpService.filterPotentialMatches(filterPotentialMatch).subscribe({
      next: (data: PossibleMatchesUserData[]) => {
        this.potentialMatches.set(data);
      },
      error: (error: any) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }
}
