import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tags } from '../../shared/models/tags';
import { UserService } from '../../shared/services/user.service';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-modify-interests',
  standalone: true,
  imports: [CardComponent, FormsModule, CustomButtonComponent],
  templateUrl: './modify-interests.component.html',
  styleUrl: './modify-interests.component.scss',
})
export class ModifyInterestsComponent implements OnInit {
  @Input({ required: true }) onCancel!: () => void;
  @Input({ required: true }) interestList: string[] = [];
  private userService = inject(UserService);

  tagsList = tags;
  selectedTags: string[] = [];

  ngOnInit() {
    this.selectedTags = [...this.interestList];
  }

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

  onSubmit() {
    const selectedTagsObj = { interests: this.selectedTags };
    const subscription = this.userService
      .modifyInterests(selectedTagsObj)
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
          console.log('Error updating interests:', error);
        },
      });
    this.onCancel();
  }
}
