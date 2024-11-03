import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { UserRequestsService } from './user.requests.service';
import { emptyUser } from '../models/emptyUser';
import {
  ModifiedUserEmail,
  ModifiedUserGeneral,
  ModifiedUserPassword,
  UserData,
} from '../models/data-to-api/user';

type Interests = { interests: string[] };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRequestsService = inject(UserRequestsService);

  interestList = signal<Interests>({ interests: [] });
  profileData = signal<UserData>(emptyUser);

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
        next: (data: ModifiedUserGeneral) => {
          this.profileData.update((prev) => {
            return {
              ...prev,
              firstName: data.firstname,
              lastName: data.lastname,
              selectedGender: data.selectedGender,
              sexualPreference: data.sexualPreference,
              bio: data.bio,
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
          this.profileData.update((prev) => {
            return {
              ...prev,
              firstName: data.firstname,
              lastName: data.lastname,
              selectedGender: data.selectedGender,
              sexualPreference: data.sexualPreference,
              bio: data.bio,
            };
          });
        },
        error: (error: any) => {
          console.log('Error getting user profile:', error);
        },
      });
  }

  modifyEmail(userData: ModifiedUserEmail) {
    console.log('userData: ' + JSON.stringify(userData));
    const subscription = this.userRequestsService
      .modifyEmail(userData)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: ModifiedUserEmail) => {
          console.log('data: ' + JSON.stringify(data));
          this.profileData.update((prev) => {
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
          this.profileData.update((prev) => {
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

  modifyPictures(pictures: File[], profilePicture: string) {
    const subscription = this.userRequestsService
      .modifyPictures(pictures)
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: any) => {
          this.profileData.update((prev) => {
            return {
              ...prev,
              pictures: data.pictures,
            };
          });
          this.modifyProfilePicture(profilePicture);
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
          this.profileData.update((prev) => {
            return {
              ...prev,
              profilePicture: data.selectedPicture,
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
          this.profileData.update((prev) => {
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
}
