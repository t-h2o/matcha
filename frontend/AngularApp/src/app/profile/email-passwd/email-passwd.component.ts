import { Component, computed, inject, Input } from '@angular/core';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { CardComponent } from '../../UI/card/card.component';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-email-passwd',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent],
  templateUrl: './email-passwd.component.html',
  styleUrl: './email-passwd.component.scss',
})
export class EmailPasswdComponent {
  @Input({ required: true }) onModify!: () => void;
  private userService = inject(UserService);
  userEmail = computed(() => this.userService.profileData().email);

  get Email() {
    if (this.userEmail() === '') {
      return 'No email';
    }
    return this.userEmail();
  }
}
