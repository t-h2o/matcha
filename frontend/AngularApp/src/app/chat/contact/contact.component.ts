import { Component, Input } from '@angular/core';
import { chatContact } from '../../shared/models/data-to-api/user';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  @Input({ required: true }) contact!: chatContact;

  onClickContact() {
    console.log(`${this.contact.username} was clicked`);
  }
}
