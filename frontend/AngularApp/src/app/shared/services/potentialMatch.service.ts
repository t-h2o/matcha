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

  matchesNames = signal<String[]>([]);
  potentialMatches = signal<PossibleMatchesUserData[]>([]);
  otherProfileData = signal<UserData>(emptyUser);
  potentialMatchSearchFilter = signal<FilterPotentialMatch>({
    ageGap: 5,
    fameGap: 2,
    distance: 101,
    interests: [],
  });
  potentialMatchFilter = signal<string>('all');

  getAllPotentialMatches() {
    this.httpService
      .filterPotentialMatches(this.potentialMatchSearchFilter())
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

  getAllPotentialMatchesWithoutFilter() {
    this.httpService
      .filterPotentialMatches({
        ageGap: 31,
        fameGap: 5,
        distance: 101,
        interests: [],
      })
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

  toggleLike(payload: { unlike: string } | { like: string }) {
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

  toggleUserAsFake(payload: { fake: string } | { unfake: string }) {
    this.httpService.reportFake(payload).subscribe({
      next: () => {
        this.otherProfileData.update((prev) => {
          return {
            ...prev,
            isFaked: !prev.isFaked,
          };
        });
      },
    });
  }

  getAllMatches() {
    this.httpService.getAllMatches().subscribe({
      next: (data: String[]) => {
        this.matchesNames.set(data);
      },
      error: (error: any) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }

  blockUser(payload: { block: string } | { unblock: string }) {
    this.httpService.blockUser(payload).subscribe({
      next: () => {
        this.otherProfileData.update((prev) => {
          return {
            ...prev,
            isBlocked: !prev.isBlocked,
          };
        });
      },
      error: (error: any) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }
}
