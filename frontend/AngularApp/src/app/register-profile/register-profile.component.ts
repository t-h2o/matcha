import { Component } from '@angular/core';
import { CardComponent } from '../UI/card/card.component';
import { tags } from '../shared/models/tags';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-profile',
  standalone: true,
  imports: [CardComponent, NgFor, FormsModule],
  templateUrl: './register-profile.component.html',
  styleUrl: './register-profile.component.scss',
})
export class RegisterProfileComponent {
  tagsList = tags;
  maxFiles = 5;
  maxSizePerFile = 5 * 1024 * 1024; // 5MB
  selectedTags: string[] = [];
  uploadedPictures: File[] = [];

  onTagChange(event: any) {
    const tag = event.target.value;
    if (event.target.checked) {
      this.selectedTags.push(tag);
    } else {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      }
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files) {
      if (files.length <= 5) {
        if (files) {
          this.handleFiles(files);
        }
      } else {
        alert('You can upload a maximum of 5 pictures.');
        input.value = '';
        this.uploadedPictures = [];
      }
    }
  }

  onSubmit(form: any) {
    console.log('Form Submitted!', form.value);
    console.log('Selected Tags:', this.selectedTags);
    console.log('Uploaded Pictures:', this.uploadedPictures);
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
}
