import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  @Input() userPictures!: string[];
  @Input() profilePicture!: string;
  @Input() onCancel!: () => void;
  private http = inject(HttpClient);

  selectedPictures: File[] = [];
  maxFiles = 5;
  maxSizePerFile = 5 * 1024 * 1024; // 5MB

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files[0]);
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) {
      this.handleFiles(files[0]);
    }
  }

  handleFiles(file: File) {
    if (file?.size >= this.maxSizePerFile) {
      alert(
        'File size is too large. Please ensure all files are less than 5MB each.'
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
    const formData = new FormData();
    this.selectedPictures.forEach((file, index) => {
      formData.append(`file${index}`, file, file.name);
    });

    this.http.post('/api/upload', formData).subscribe(
      (response) => console.log('Upload successful', response),
      (error) => console.error('Upload failed', error)
    );
  }

  removeFile(file: File) {
    this.selectedPictures = this.selectedPictures.filter(
      (picture) => picture !== file
    );
  }

  onSubmit() {
    // this.uploadFiles();
    console.log('Submit');
  }
}
