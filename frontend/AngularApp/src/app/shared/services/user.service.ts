import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import {
  ModifiedUserEmail,
  ModifiedUserGeneral,
  ModifiedUserPassword,
  ModifyGeneralData,
  UserData,
  UserRegister,
} from '../models/data-to-api/user';
import { emptyUser } from '../models/emptyUser';
import { HttpRequestsService } from './http.requests.service';
import { ToastService } from './toast.service';

type Interests = { interests: string[] };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpService = inject(HttpRequestsService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  interestList = signal<Interests>({ interests: [] });
  ownProfileData = signal<UserData>(emptyUser);

  getInterests() {
    const subscription = this.httpService
      .getInterests()
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: Interests) => {
          this.interestList.set(data);
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }

  modifyInterests(selectedTagsObj: Interests) {
    const subscription = this.httpService
      .modifyInterestsRequest(selectedTagsObj)
      .pipe(
        finalize(() => {
          subscription.unsubscribe();
        }),
      )
      .subscribe({
        next: (data: Interests) => {
          this.interestList.set(data);
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }

  getUserProfile() {
    const subscription = this.httpService
      .getUser()
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: UserData) => {
          this.ownProfileData.update((prev) => {
            return {
              ...prev,
              username: data.username,
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              selectedGender: data.selectedGender,
              sexualPreference: data.sexualPreference,
              bio: data.bio,
              age: data.age,
              emailVerified: data.emailVerified,
              profile_complete: data.profile_complete,
              fameRating: data.fameRating,
              urlProfile: data.urlProfile,
            };
          });
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }

  modifyUserProfile(userData: ModifyGeneralData) {
    const subscription = this.httpService
      .modifyUser(userData)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: ModifiedUserGeneral) => {
          this.ownProfileData.update((prev) => {
            return {
              ...prev,
              age: data.age,
              bio: data.bio,
              email: data.email,
              firstName: data.firstname,
              lastName: data.lastname,
              selectedGender: data.selectedGender,
              sexualPreference: data.sexualPreference,
              emailVerified: data.email_verified,
              fameRating: data.fameRating,
              profile_complete: data.profile_complete,
            };
          });
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }

  modifyEmail(userData: ModifiedUserEmail) {
    const subscription = this.httpService
      .modifyEmail(userData)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: ModifiedUserEmail) => {
          this.ownProfileData.update((prev) => {
            return {
              ...prev,
              email: data.email,
            };
          });
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }

  getUserEmail() {
    const subscription = this.httpService
      .getEmail()
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: ModifiedUserEmail) => {
          this.ownProfileData.update((prev) => {
            return {
              ...prev,
              email: data.email,
            };
          });
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }

  modifyPassword(userData: ModifiedUserPassword) {
    const subscription = this.httpService
      .modifyPassword(userData)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: any) => {
          console.log('data: ' + JSON.stringify(data));
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }

  modifyPictures(pictures: File[]) {
    const subscription = this.httpService
      .modifyPictures(pictures)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: any) => {
          this.ownProfileData.update((prev) => {
            return {
              ...prev,
              pictures: data.pictures,
            };
          });
        },
        error: (error: any) => {
          console.log('error:', error);
          const errorMessage =
            error?.error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }

  modifyProfilePicture(pictureName: string) {
    const subscription = this.httpService
      .modifyProfilePicture(pictureName)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: any) => {
          this.ownProfileData.update((prev) => {
            return {
              ...prev,
              urlProfile: data.selectedPicture,
            };
          });
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }

  getUserPictures() {
    const subscription = this.httpService
      .getPictures()
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: any) => {
          this.ownProfileData.update((prev) => {
            return {
              ...prev,
              pictures: data.pictures,
            };
          });
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }

  resetPassword(resetData: { username: string }) {
    const subscription = this.httpService
      .resetPassword(resetData)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: any) => {
          console.log('data: ' + JSON.stringify(data));
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }

  sendUserRegisterData(userData: UserRegister) {
    const subscription = this.httpService.register(userData).subscribe({
      next: (_data) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
      complete: () => {
        subscription.unsubscribe();
      },
    });
  }
}
