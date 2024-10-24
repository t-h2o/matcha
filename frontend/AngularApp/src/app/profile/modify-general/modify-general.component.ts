import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  @Input({ required: true }) isModifyingGeneral!: boolean;
  @Input({ required: true }) onCancel!: () => void;
  @Input({ required: true }) userProfile!: UserData;

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

  onSubmit(form: any) {
    console.log('Form Submitted!', form.value);
  }
}
