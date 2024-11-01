import { inject, Injectable, signal } from '@angular/core';
import { UserRequestsService } from './user.requests.service';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRequestsService = inject(UserRequestsService);

  interestList = signal<{ interests: string[] }>({ interests: [] });

  getInterests() {
    const subscription = this.userRequestsService
      .getInterests()
      .pipe(finalize(() => subscription.unsubscribe()))
      .subscribe({
        next: (data: { interests: string[] }) => {
          this.interestList.set(data);
          console.log('Interests from back :', data);
        },
        error: (error: any) => {
          console.log('Error getting interests:', error);
        },
      });
  }

  modifyInterests(selectedTagsObj: { interests: string[] }) {
    const subscription = this.userRequestsService
      .modifyInterestsRequest(selectedTagsObj)
      .pipe(
        finalize(() => {
          subscription.unsubscribe();
        }),
      )
      .subscribe({
        next: (data: any) => {
          console.log('data: ' + JSON.stringify(data));
        },
        error: (error: any) => {
          console.log('Error updating interests:', error);
        },
      });
  }
}
