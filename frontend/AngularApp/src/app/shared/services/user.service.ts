import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { UserRequestsService } from './user.requests.service';
import { UserData } from '../../profile/dummyUserData';
import { emptyUser } from '../models/emptyUser';

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
}
