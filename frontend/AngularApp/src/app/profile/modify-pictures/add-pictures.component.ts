import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { PicturePreviewComponent } from './picture-preview/picture-preview.component';

@Component({
  selector: 'app-add-pictures',
  standalone: true,
  imports: [FormsModule, CustomButtonComponent, PicturePreviewComponent],
  templateUrl: './add-pictures.component.html',
  styleUrl: './add-pictures.component.scss',
})
export class AddPicturesComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  userPictures = this.userService.ownProfileData().pictures;
  profilePicture = this.userService.ownProfileData().urlProfile;

  selectedPictures: File[] = [];
  maxFiles = 5;
  maxSizePerFile = 5 * 1024 * 1024;
  localProfilePicture = '';

  goBack() {
    this.router.navigate(['/profile']);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files) {
      this.addFile(files[0]);
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) {
      this.addFile(files[0]);
    }
  }

  removeFile(file: File) {
    this.selectedPictures = this.selectedPictures.filter(
      (picture) => picture !== file,
    );
  }

  private addFile(file: File) {
    if (file?.size >= this.maxSizePerFile) {
      alert(
        'File size is too large. Please ensure all files are less than 5MB each.',
      );
      return;
    }
    if (this.selectedPictures.length >= this.maxFiles) {
      alert(`You can upload a maximum of ${this.maxFiles} pictures.`);
      return;
    }
    this.selectedPictures.push(file);
  }

  onSubmit() {
    if (this.selectedPictures.length > 0) {
      this.userService.modifyPictures(this.selectedPictures);
    }
  }
}
