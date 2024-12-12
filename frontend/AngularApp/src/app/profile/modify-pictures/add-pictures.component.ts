import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
export class AddPicturesComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  selectedPictures = signal<File[]>([]);
  userProfileData = this.userService.ownProfileData;

  maxFiles = 5;
  maxSizePerFile = 5 * 1024 * 1024;
  localProfilePicture = '';
  numberOfPicturesUploadable = computed(() => {
    return (
      this.maxFiles -
      (this.userProfileData().pictures.length + this.selectedPictures().length)
    );
  });

  ngOnInit(): void {
    console.log(this.userProfileData());
    this.userService.getUserProfile();
    this.userService.getUserPictures();
  }

  get subTitleString() {
    return `You can upload up to ${this.numberOfPicturesUploadable()} pictures.`;
  }

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
    if (files && files.length <= this.numberOfPicturesUploadable()) {
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
    this.selectedPictures.update(() => {
      return this.selectedPictures().filter((picture) => picture !== file);
    });
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
    this.selectedPictures.update((prev) => {
      return [...prev, file];
    });
  }

  onSubmit() {
    if (this.selectedPictures().length > 0) {
      this.userService.modifyPictures(this.selectedPictures());
    }
  }
}
