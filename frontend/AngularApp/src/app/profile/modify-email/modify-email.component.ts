import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { PasswordConfirmValidatorDirective } from '../../shared/directives/password-confirm-validator.directive';

@Component({
  selector: 'app-modify-email',
  standalone: true,
  imports: [
    FormsModule,
    CardComponent,
    CustomButtonComponent,
    PasswordConfirmValidatorDirective,
  ],
  templateUrl: './modify-email.component.html',
  styleUrl: './modify-email.component.scss',
})
export class ModifyEmailComponent implements OnInit {
  @Input({ required: true }) onCancel!: () => void;
  @Input({ required: true }) userEmail!: string;

  uEmail: string = '';

  ngOnInit(): void {
    this.uEmail = this.userEmail;
    console.log('Email:', this.userEmail);
  }

  onSubmitEmail(form: NgForm) {
    console.log('Form Submitted!', form.value);
    this.onCancel();
  }

  onSubmitPassword(form: NgForm) {
    console.log('Form Submitted!', form.value);
    this.onCancel();
  }
}