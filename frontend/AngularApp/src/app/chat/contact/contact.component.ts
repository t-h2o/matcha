import { Component, inject, Input } from '@angular/core';
import { chatContact } from '../../shared/models/data-to-api/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  @Input({ required: true }) contact!: chatContact;
  private router = inject(Router);

  onClickContact() {
    this.router.navigate(['/chat', this.contact.username]);
  }
}
