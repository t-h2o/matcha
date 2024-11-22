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
    this.httpService.getInterests().subscribe({
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
    this.httpService.modifyInterestsRequest(selectedTagsObj).subscribe({
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
    this.httpService.getUser().subscribe({
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
    this.httpService
      .modifyUser(userData)

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
    this.httpService
      .modifyEmail(userData)

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
    this.httpService
      .getEmail()

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
    this.httpService
      .modifyPassword(userData)

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
    this.httpService
      .modifyPictures(pictures)

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
    this.httpService
      .modifyProfilePicture(pictureName)

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
    this.httpService
      .getPictures()

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
    this.httpService
      .resetPassword(resetData)

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
    this.httpService.register(userData).subscribe({
      next: (_data) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }
}
