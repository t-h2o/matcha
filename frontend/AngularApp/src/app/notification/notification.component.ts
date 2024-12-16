import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NotificationService } from '../shared/services/notification.service';
import { DisplayNotifComponent } from './display-notif/display-notif.component';
import { Notification } from '../shared/models/message';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [DisplayNotifComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
  private notificationService = inject(NotificationService);
  notificationList = this.notificationService.notificationList;
  notificationListWithDate = computed(() =>
    this.notificationList().map((notification: Notification) => {
      notification.date = this.format24HourDateTime(notification.timestamp);
      return notification;
    }),
  );

  notificationListReversed = computed(() =>
    this.notificationListWithDate().reverse(),
  );

  ngOnInit(): void {
    this.notificationService.getNotifications();
  }

  onDeleteNotificationHandler(notificationId: number) {
    console.log('Delete notification with id: ', notificationId);
    this.notificationService.deleteNotification(notificationId);
  }

  format24HourDateTime(timestamp: number): string {
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date(timestamp));
  }
}
