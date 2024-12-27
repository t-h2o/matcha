import { Component, inject, input } from '@angular/core';
import { CustomButtonComponent } from '../../../UI/custom-button/custom-button.component';
import { PotentialMatchService } from '../../../shared/services/potentialMatch.service';

@Component({
  selector: 'app-block-fake',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './block-fake.component.html',
  styleUrl: './block-fake.component.scss',
})
export class BlockFakeComponent {
  private PotentialMatchService = inject(PotentialMatchService);
  username = input.required<string>();
  isFake = input.required<boolean>();

  reportAsFake(username: string): void {
    if (this.isFake()) {
      const payload = { unfake: username };
      this.PotentialMatchService.toggleUserAsFake(payload);
    } else {
      const payload = { fake: username };
      this.PotentialMatchService.toggleUserAsFake(payload);
    }
  }
  blockUser(username: string): void {
    console.log(`User ${username} blocked`);
  }
}
