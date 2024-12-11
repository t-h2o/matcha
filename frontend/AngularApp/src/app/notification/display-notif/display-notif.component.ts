import { Component, input, output } from '@angular/core';
import { Notification } from '../../shared/models/message';

@Component({
  selector: 'app-display-notif',
  standalone: true,
  imports: [],
  templateUrl: './display-notif.component.html',
  styleUrl: './display-notif.component.scss',
})
export class DisplayNotifComponent {
  notificationList = input.required<Notification[]>();
  onDeleteNotification = output<number>();

  onDeleteNotificationHandler(notificationId: number) {
    this.onDeleteNotification.emit(notificationId);
  }
}
