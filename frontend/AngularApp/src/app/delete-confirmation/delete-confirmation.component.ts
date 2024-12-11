import { Component, inject } from '@angular/core';
import { CardComponent } from '../UI/card/card.component';
import { Router } from '@angular/router';
import { CustomButtonComponent } from '../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss',
})
export class DeleteConfirmationComponent {
  private router = inject(Router);

  onConfirmHandler() {
    // logic to delete user
    this.router.navigate(['/register']);
  }
  onCancelHandler() {
    this.router.navigate(['/profile']);
  }
}
