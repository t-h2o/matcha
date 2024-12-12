import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-pictures-list',
  standalone: true,
  imports: [],
  templateUrl: './pictures-list.component.html',
  styleUrl: './pictures-list.component.scss',
})
export class PicturesListComponent {
  @Input({ required: true }) file!: string;
  @Output() remove = new EventEmitter<string>();
  private userService = inject(UserService);

  removeFile() {
    this.remove.emit(this.file);
    this.userService.deletePicture(this.file);
  }
}
