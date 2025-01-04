import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModifyGeneralData } from '../../shared/models/data-to-api/user';
import { UserService } from '../../shared/services/user.service';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { LocalizationService } from '../../shared/services/localization.service';
import { HttpRequestsService } from '../../shared/services/http.requests.service';

@Component({
  selector: 'app-modify-general',
  standalone: true,
  imports: [FormsModule, CustomButtonComponent, CardComponent],
  templateUrl: './modify-general.component.html',
  styleUrl: './modify-general.component.scss',
})
export class ModifyGeneralComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private localizationService = inject(LocalizationService);
  private httpService = inject(HttpRequestsService);
  location = this.localizationService.location;
  userProfile = this.userService.ownProfileData;

  firstName: string = '';
  lastName: string = '';
  selectedGender: string = '';
  sexualPreference: string = '';
  bio: string = '';
  age: string = '';
  lat: string = '';
  long: string = '';

  ngOnInit() {
    this.firstName = this.userProfile().firstname;
    this.lastName = this.userProfile().lastname;
    this.selectedGender = this.userProfile().selectedGender;
    this.sexualPreference = this.userProfile().sexualPreference;
    this.bio = this.userProfile().bio;
    this.age = this.userProfile().age;
    this.lat =
      this.location().latitude.toString() === '999'
        ? '-91'
        : this.location().latitude.toString();
    this.long =
      this.location().latitude.toString() === '999'
        ? '-181'
        : this.location().longitude.toString();
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    const modifiedUserData: ModifyGeneralData = {
      firstname: this.firstName,
      lastname: this.lastName,
      selectedGender: this.selectedGender,
      sexualPreference: this.sexualPreference,
      bio: this.bio,
      age: this.age,
      email_verified: this.userProfile().email_verified,
    };

    const newLocation = {
      latitude: parseFloat(this.lat),
      longitude: parseFloat(this.long),
      accuracy: this.location().accuracy,
    };

    this.localizationService.location.set(newLocation);
    this.httpService.sendCoordinates(newLocation).subscribe({
      next: (data: any) => {
        this.location.update((prev) => {
          return {
            ...prev,
            latitude: data.latitude,
            longitude: data.longitude,
          };
        });
      },
    });
    this.userService.modifyUserProfile(modifiedUserData);
    formData.form.reset();
    this.goBack();
  }
}
