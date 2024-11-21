import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import {
  ModifiedUserEmail,
  ModifiedUserGeneral,
  ModifiedUserPassword,
  ModifyGeneralData,
  UserData,
} from '../models/data-to-api/user';
import { emptyUser } from '../models/emptyUser';
import { ErrorService } from './error.service';
import { UserRequestsService } from './http.requests.service';

type Interests = { interests: string[] };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRequestsService = inject(UserRequestsService);
  private errorService = inject(ErrorService);

  interestList = signal<Interests>({ interests: [] });
  ownProfileData = signal<UserData>(emptyUser);

  getInterests() {
    const subscription = this.userRequestsService
      .getInterests()
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: Interests) => {
          this.interestList.set(data);
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.errorService.showError(errorMessage);
        },
      });
  }

  modifyInterests(selectedTagsObj: Interests) {
    const subscription = this.userRequestsService
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
          this.errorService.showError(errorMessage);
        },
      });
  }

  getUserProfile() {
    const subscription = this.userRequestsService
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
          this.errorService.showError(errorMessage);
        },
      });
  }

  modifyUserProfile(userData: ModifyGeneralData) {
    const subscription = this.userRequestsService
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
          this.errorService.showError(errorMessage);
        },
      });
  }

  modifyEmail(userData: ModifiedUserEmail) {
    const subscription = this.userRequestsService
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
          this.errorService.showError(errorMessage);
        },
      });
  }

  getUserEmail() {
    const subscription = this.userRequestsService
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
          this.errorService.showError(errorMessage);
        },
      });
  }

  modifyPassword(userData: ModifiedUserPassword) {
    const subscription = this.userRequestsService
      .modifyPassword(userData)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: any) => {
          console.log('data: ' + JSON.stringify(data));
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.errorService.showError(errorMessage);
        },
      });
  }

  modifyPictures(pictures: File[]) {
    const subscription = this.userRequestsService
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
          this.errorService.showError(errorMessage);
        },
      });
  }

  modifyProfilePicture(pictureName: string) {
    const subscription = this.userRequestsService
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
          this.errorService.showError(errorMessage);
        },
      });
  }

  getUserPictures() {
    const subscription = this.userRequestsService
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
          this.errorService.showError(errorMessage);
        },
      });
  }

  resetPassword(resetData: { username: string }) {
    const subscription = this.userRequestsService
      .resetPassword(resetData)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: any) => {
          console.log('data: ' + JSON.stringify(data));
        },
        error: (error: any) => {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.errorService.showError(errorMessage);
        },
      });
  }
}
