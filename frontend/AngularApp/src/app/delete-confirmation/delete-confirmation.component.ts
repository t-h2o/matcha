import { Component, inject } from '@angular/core';
import { CardComponent } from '../UI/card/card.component';
import { Router } from '@angular/router';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss',
})
export class DeleteConfirmationComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  onConfirmHandler() {
    this.userService.deleteUserAccount();
    this.authService.tokenSignal.set(null);
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/register']);
  }
  onCancelHandler() {
    this.router.navigate(['/profile']);
  }
}
