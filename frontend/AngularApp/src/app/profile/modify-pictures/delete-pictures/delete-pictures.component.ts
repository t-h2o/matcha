import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { PicturesListComponent } from './pictures-list/pictures-list.component';
import { CustomButtonComponent } from '../../../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-delete-pictures',
  standalone: true,
  imports: [FormsModule, PicturesListComponent, CustomButtonComponent],
  templateUrl: './delete-pictures.component.html',
  styleUrl: './delete-pictures.component.scss',
})
export class DeletePicturesComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  selectedPictures = signal<string[]>([]);
  userProfileData = computed(() => this.userService.ownProfileData().pictures);

  ngOnInit(): void {
    this.selectedPictures.set(this.userProfileData());
    this.userService.getUserPictures();
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

  removeFile(file: string) {
    this.selectedPictures.update(() => {
      return this.selectedPictures().filter((picture) => picture !== file);
    });
  }
}
