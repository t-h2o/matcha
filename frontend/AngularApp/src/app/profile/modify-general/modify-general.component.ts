import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { UserData } from '../dummyUserData';
import { UserModifyGeneral } from '../../shared/models/data-to-api/user';
import { UserService } from '../../shared/services/user.service';

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

  private userService = inject(UserService);

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
    const modifiedUserData: UserModifyGeneral = {
      firstname: formData.value.firstname,
      lastname: formData.value.lastname,
      selectedGender: formData.value.selectedGender,
      sexualPreference: formData.value.sexualPreference,
      bio: formData.value.bio,
    };

    this.sendUserDataToAPI(modifiedUserData);
    formData.form.reset();
    this.onCancel();
  }

  private sendUserDataToAPI(userData: UserModifyGeneral) {
    const subscription = this.userService.modifyGeneral(userData).subscribe({
      next: (data: any) => {
        console.log('data: ' + JSON.stringify(data));
      },
      error: (error: any) => {
        console.error('error: ' + JSON.stringify(error));
      },
      complete: () => {
        subscription.unsubscribe();
      },
    });
  }
}
