import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ModifiedUserGeneral } from '../../shared/models/data-to-api/user';
import { UserService } from '../../shared/services/user.service';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { CardComponent } from '../../UI/card/card.component';

@Component({
  selector: 'app-modify-general',
  standalone: true,
  imports: [FormsModule, CustomButtonComponent, CardComponent],
  templateUrl: './modify-general.component.html',
  styleUrl: './modify-general.component.scss',
})
export class ModifyGeneralComponent implements OnInit {
  @Input({ required: true }) onCancel!: () => void;
  private userService = inject(UserService);
  userProfile = this.userService.ownProfileData;

  firstName: string = '';
  lastName: string = '';
  selectedGender: string = '';
  sexualPreference: string = '';
  bio: string = '';
  age: string = '';

  ngOnInit() {
    this.firstName = this.userProfile().firstname;
    this.lastName = this.userProfile().lastname;
    this.selectedGender = this.userProfile().selectedGender;
    this.sexualPreference = this.userProfile().sexualPreference;
    this.bio = this.userProfile().bio;
    this.age = this.userProfile().age;
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
      age: this.age,
      email_verified: this.userProfile().emailVerified,
    };

    this.userService.modifyUserProfile(modifiedUserData);
    formData.form.reset();
    this.onCancel();
  }
}
