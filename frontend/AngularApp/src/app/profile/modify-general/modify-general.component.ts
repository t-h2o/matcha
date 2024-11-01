import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { finalize } from 'rxjs';
import { ModifiedUserGeneral } from '../../shared/models/data-to-api/user';
import { UserRequestsService } from '../../shared/services/user.requests.service';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { UserData } from '../dummyUserData';

@Component({
  selector: 'app-modify-general',
  standalone: true,
  imports: [CardComponent, FormsModule, CustomButtonComponent],
  templateUrl: './modify-general.component.html',
  styleUrl: './modify-general.component.scss',
})
export class ModifyGeneralComponent implements OnInit {
  @Input({ required: true }) onCancel!: () => void;
  @Input({ required: true }) userProfile!: UserData;

  private userService = inject(UserRequestsService);

  firstName: string = '';
  lastName: string = '';
  selectedGender: string = '';
  sexualPreference: string = '';
  bio: string = '';

  ngOnInit() {
    this.firstName = this.userProfile.firstName;
    this.lastName = this.userProfile.lastName;
    this.selectedGender = this.userProfile.gender;
    this.sexualPreference = this.userProfile.sexualPreference;
    this.bio = this.userProfile.bio;
  }

  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      Object.keys(formData.controls).forEach((field) => {
        const control = formData.controls[field];
        if (control.invalid) {
          console.log(`${field} is invalid`);
        }
      });
      return;
    }
    const modifiedUserData: ModifiedUserGeneral = {
      firstname: this.firstName,
      lastname: this.lastName,
      selectedGender: this.selectedGender,
      sexualPreference: this.sexualPreference,
      bio: this.bio,
    };

    this.sendUserDataToAPI(modifiedUserData);
    formData.form.reset();
    this.onCancel();
  }

  private sendUserDataToAPI(userData: ModifiedUserGeneral) {
    const subscription = this.userService
      .modifyUser(userData)
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
          console.error('error: ' + JSON.stringify(error));
        },
      });
  }
}
