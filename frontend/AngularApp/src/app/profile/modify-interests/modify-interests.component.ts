import { Component } from '@angular/core';
import { tags } from '../../shared/models/tags';
import { CardComponent } from '../../UI/card/card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modify-interests',
  standalone: true,
  imports: [CardComponent, FormsModule],
  templateUrl: './modify-interests.component.html',
  styleUrl: './modify-interests.component.scss',
})
export class ModifyInterestsComponent {
  tagsList = tags;
  selectedTags: string[] = [];

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

  onSubmit(form: any) {
    console.log('Form Submitted!', form.value);
  }
}
