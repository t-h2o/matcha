import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastMessage, ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [
    trigger('toastAnimation', [
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        }),
      ),
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
        }),
      ),
      transition('void => visible', [
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
        }),
        animate('300ms ease-out'),
      ]),
      transition('visible => void', [
        animate(
          '300ms ease-in',
          style({
            opacity: 0,
            transform: 'translateY(-20px)',
          }),
        ),
      ]),
    ]),
  ],
})
export class ToastComponent implements OnInit {
  toast: ToastMessage | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe((toast) => {
      this.toast = toast;
    });
  }
}
