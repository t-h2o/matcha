import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { tags } from '../../shared/models/tags';
import { UserService } from '../../shared/services/user.service';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-modify-interests',
  standalone: true,
  imports: [FormsModule, CustomButtonComponent, CardComponent],
  templateUrl: './modify-interests.component.html',
  styleUrl: './modify-interests.component.scss',
})
export class ModifyInterestsComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);

  interestList = this.userService.ownProfileData().interests;
  tagsList = tags;
  selectedTags: string[] = [];

  ngOnInit() {
    this.selectedTags = [...this.interestList];
  }

  goBack() {
    this.router.navigate(['/profile']);
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
    this.userService.modifyInterests(selectedTagsObj);
    this.goBack();
  }
}
