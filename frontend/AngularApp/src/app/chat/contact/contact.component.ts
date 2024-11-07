import { Component, Input } from '@angular/core';
import { chatContact } from '../../shared/models/data-to-api/user';
import { CardComponent } from '../../UI/card/card.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  @Input({ required: true }) contact!: chatContact;
}
