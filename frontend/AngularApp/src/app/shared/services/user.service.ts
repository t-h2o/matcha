import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
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
import { finalize } from 'rxjs';

type Interests = { interests: string[] };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpService = inject(HttpRequestsService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  ownProfileData = signal<UserData>(emptyUser);

  modifyInterests(selectedTagsObj: Interests) {
    this.httpService.modifyInterestsRequest(selectedTagsObj).subscribe({
      next: (data: Interests) => {
        this.ownProfileData.update((prev) => {
          return {
            ...prev,
            interests: data.interests,
          };
        });
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
          console.log('data getUserProfile():  ' + JSON.stringify(data));
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
            email_verified: data.email_verified,
            profile_complete: data.profile_complete,
            fameRating: data.fameRating,
            urlProfile: data.urlProfile,
            interests: data.interests,
            likedBy: data.likedBy,
            visitedBy: data.visitedBy,
          };
        });
        if (data.profile_complete === false && this.router.url !== '/profile') {
          this.router.navigate(['/profile']);
        }
      },
      error: (error: any) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }

  modifyUserProfile(userData: ModifyGeneralData) {
    this.httpService.modifyUser(userData).subscribe({
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
            email_verified: data.email_verified,
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
    this.httpService.modifyEmail(userData).subscribe({
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
    this.httpService.modifyPassword(userData).subscribe({
      next: (_data: any) => {},
      error: (error: any) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }

  sendNewPassword(payload: { password: string }, token: string) {
    this.httpService
      .sendNewPassword(payload, token)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        }),
      )
      .subscribe({
        next: (_data) => {
          this.toastService.show(
            'Your password was changed successfully',
            'success',
          );
        },
        error: (_error) => {
          const errorMessage = 'The token is invalid';
          this.toastService.show(errorMessage, 'error');
        },
      });
  }

  deletePicture(pictureName: string) {
    this.httpService.deletePicture(pictureName).subscribe({
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

  modifyPictures(pictures: File[]) {
    this.httpService.modifyPictures(pictures).subscribe({
      next: (data: any) => {
        this.ownProfileData.update((prev) => {
          this.router.navigate(['/profile']);
          return {
            ...prev,
            pictures: data.pictures,
          };
        });
      },
      error: (error: any) => {
        const errorMessage =
          error?.error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }

  modifyProfilePicture(pictureName: string) {
    this.httpService.modifyProfilePicture(pictureName).subscribe({
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
    this.httpService.getPictures().subscribe({
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
    this.httpService.resetPassword(resetData).subscribe({
      next: (_data: any) => {},
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
        if (error.status === 401) {
          const errorMessage = error.error.error;
          this.toastService.show(errorMessage, 'error');
        } else {
          const errorMessage = error?.message || 'An unknown error occurred';
          this.toastService.show(errorMessage, 'error');
        }
      },
    });
  }

  deleteUserAccount() {
    this.httpService.deleteAccount().subscribe({
      next: (_data) => {
        this.router.navigate(['/register']);
      },
      error: (error) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }

  confirmEmail() {
    this.httpService.confirmEmail().subscribe({
      next: () => {},
      error: (error: any) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }

  verifyEmailToken(token: string) {
    this.httpService.verifyEmailToken(token).subscribe({
      next: (_data) => {
        this.router.navigate(['/profile']);
      },
      error: (_error) => {
        const errorMessage = 'The token is invalid';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }
}
