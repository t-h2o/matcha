import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import {
  ModifiedUserEmail,
  ModifiedUserGeneral,
  ModifiedUserPassword,
  UserData
} from '../models/data-to-api/user';
import { emptyUser } from '../models/emptyUser';
import { UserRequestsService } from './user.requests.service';

type Interests = { interests: string[] };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRequestsService = inject(UserRequestsService);

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
          console.log('Error getting interests:', error);
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
          console.log('Error updating interests:', error);
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
          console.log('Error getting user profile:', error);
        },
      });
  }

  modifyUserProfile(userData: ModifiedUserGeneral) {
    const subscription = this.userRequestsService
      .modifyUser(userData)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: ModifiedUserGeneral) => {
          this.ownProfileData.update((prev) => {
            return {
              ...prev,
              firstName: data.firstname,
              lastName: data.lastname,
              selectedGender: data.selectedGender,
              sexualPreference: data.sexualPreference,
              bio: data.bio,
              age: data.age,
              emailVerified: data.email_verified,
            };
          });
        },
        error: (error: any) => {
          console.log('Error getting user profile:', error);
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
          console.error('error: ' + JSON.stringify(error));
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
          console.error('error: ' + JSON.stringify(error));
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
          console.error('error: ' + JSON.stringify(error));
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
          console.log('Error uploading pictures:', error);
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
          console.log('Error changing profile pictures:', error);
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
          console.log('Error uploading pictures:', error);
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
          console.error('error: ' + JSON.stringify(error));
        },
      });
  }
}
