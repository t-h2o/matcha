import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PossibleMatchesUserData } from '../../shared/models/data-to-api/user';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  @Input({ required: true }) contact!: PossibleMatchesUserData
  private router = inject(Router);

  onClickContact() {
    this.router.navigate(['/chat', this.contact.username]);
  }
}
