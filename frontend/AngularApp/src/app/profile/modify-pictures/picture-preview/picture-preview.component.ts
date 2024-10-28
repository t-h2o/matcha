import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-picture-preview',
  standalone: true,
  imports: [],
  templateUrl: './picture-preview.component.html',
  styleUrl: './picture-preview.component.scss'
})
export class PicturePreviewComponent {
  @Input() file!: File;
  @Input() profilePicture!: string;
  @Output() selectProfilePicture = new EventEmitter<string>();
  @Output() remove = new EventEmitter<File>();


  previewUrl: SafeUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.createPreview();
  }

  ngOnDestroy() {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl as string);
    }
  }

  private createPreview() {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
    };
    reader.readAsDataURL(this.file);
  }

  removeFile() {
    this.remove.emit(this.file);
  }

  handleSelectProfilePicture(fileName: string) {
    this.selectProfilePicture.emit(fileName);
  }
}
