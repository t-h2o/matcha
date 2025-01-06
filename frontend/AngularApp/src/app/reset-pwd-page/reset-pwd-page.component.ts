import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordConfirmValidatorDirective } from '../shared/directives/password-confirm-validator.directive';
import { UserService } from '../shared/services/user.service';
import { CardComponent } from '../UI/card/card.component';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-reset-pwd-page',
  standalone: true,
  imports: [
    FormsModule,
    CardComponent,
    CustomButtonComponent,
    PasswordConfirmValidatorDirective,
  ],
  templateUrl: './reset-pwd-page.component.html',
  styleUrl: './reset-pwd-page.component.scss',
})
export class ResetPwdPageComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private token: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  onSubmitPassword(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const newPasswordPayload = {
      password: form.value.passwordRepetition as string,
    };
    this.userService.sendNewPassword(newPasswordPayload, this.token);
    form.form.reset();
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
