import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPasswordConfirm]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordConfirmValidatorDirective, multi: true }],
  standalone: true
})
export class PasswordConfirmValidatorDirective implements Validator {
  @Input('appPasswordConfirm') passwordField!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.passwordField) {
      return null; // If passwordField is not set, skip validation
    }

    const password = control.root.get(this.passwordField);
    const confirmPassword = control;

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}