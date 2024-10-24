import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tags } from '../../shared/models/tags';
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';

@Component({
  selector: 'app-modify-general',
  standalone: true,
  imports: [CardComponent, FormsModule, CustomButtonComponent],
  templateUrl: './modify-general.component.html',
  styleUrl: './modify-general.component.scss',
})
export class ModifyGeneralComponent {
  @Input({ required: true }) isModifyingGeneral!: boolean;
  @Input({ required: true }) onCancel!: () => void;
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
