import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { UserRequestsService } from '../../shared/services/user.requests.service';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { PicturePreviewComponent } from './picture-preview/picture-preview.component';

@Component({
  selector: 'app-modify-pictures',
  standalone: true,
  imports: [FormsModule, CustomButtonComponent, PicturePreviewComponent],
  templateUrl: './modify-pictures.component.html',
  styleUrl: './modify-pictures.component.scss',
})
export class ModifyPicturesComponent {
  @Input({ required: true }) userPictures!: string[];
  @Input({ required: true }) profilePicture!: string;
  @Input() onCancel!: () => void;
  private userService = inject(UserRequestsService);

  selectedPictures: File[] = [];
  maxFiles = 5;
  maxSizePerFile = 5 * 1024 * 1024;
  localProfilePicture = '';

  handleSelectProfilePicture(fileName: string) {
    this.localProfilePicture = fileName;
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
    if (this.localProfilePicture === file.name) {
      this.localProfilePicture = '';
    }
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

  uploadFiles() {
    const subscription = this.userService
      .modifyPictures(this.selectedPictures)
      .pipe(
        finalize(() => {
          subscription.unsubscribe();
        }),
      )
      .subscribe({
        next: (data: any) => {
          console.log('data: ' + JSON.stringify(data));
        },
        error: (error: any) => {
          console.log('Error uploading pictures:', error);
        },
      });
  }

  changeProfilePicture() {
    const subscription = this.userService
      .modifyProfilePicture(this.localProfilePicture)
      .pipe(
        finalize(() => {
          subscription.unsubscribe();
        }),
      )
      .subscribe({
        next: (data: any) => {
          console.log('data: ' + JSON.stringify(data));
        },
        error: (error: any) => {
          console.log('Error changing profile pictures:', error);
        },
      });
  }

  onSubmit() {
    if (
      this.selectedPictures.length > 0 &&
      this.localProfilePicture.trim().length > 0
    ) {
      this.uploadFiles();
      this.changeProfilePicture();
    }
    this.onCancel();
  }
}
