import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-modify-pictures',
  standalone: true,
  imports: [FormsModule, CustomButtonComponent],
  templateUrl: './modify-pictures.component.html',
  styleUrl: './modify-pictures.component.scss',
})
export class ModifyPicturesComponent {
  @Input() userPictures!: string[];
  @Input() profilePicture!: string;
  @Input() onCancel!: () => void;
  private http = inject(HttpClient);

  uploadedPictures: File[] = [];
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
      this.handleFiles(files);
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  handleFiles(files: FileList) {
    const validFiles = Array.from(files).filter(
      (file) =>
        file.type.startsWith('image/') && file.size <= this.maxSizePerFile,
    );

    if (validFiles.length > this.maxFiles) {
      alert(`You can upload a maximum of ${this.maxFiles} pictures.`);
      return;
    }

    if (validFiles.length < files.length) {
      alert(
        'Some files were skipped. Please ensure all files are images and less than 5MB each.',
      );
    }

    this.uploadedPictures = validFiles;
  }

  uploadFiles() {
    const formData = new FormData();
    this.uploadedPictures.forEach((file, index) => {
      formData.append(`file${index}`, file, file.name);
    });

    this.http.post('/api/upload', formData).subscribe(
      (response) => console.log('Upload successful', response),
      (error) => console.error('Upload failed', error),
    );
  }
}
