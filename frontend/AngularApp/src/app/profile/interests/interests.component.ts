<<<<<<< HEAD
<<<<<<< HEAD
import { Component, computed, inject, Input } from '@angular/core';
=======
import {
  Component,
  computed,
  effect,
  inject,
  input,
  Input,
} from '@angular/core';
>>>>>>> 71acfe7 (components use userService for interests CRUD)
=======
import { Component, computed, inject, Input } from '@angular/core';
>>>>>>> 63faf3b (format)
import { CardComponent } from '../../UI/card/card.component';
import { CustomButtonComponent } from '../../UI/custom-button/custom-button.component';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CardComponent, CustomButtonComponent],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss',
})
export class InterestsComponent {
  @Input({ required: true }) onModify!: () => void;

  private userServices = inject(UserService);
  interestList = this.userServices.interestList;

  interests = computed(() => this.interestList().interests);
}
