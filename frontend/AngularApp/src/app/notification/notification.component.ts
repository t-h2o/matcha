import { Component, computed, inject, OnInit } from '@angular/core';
import { Notification } from '../shared/models/message';
import { NotificationService } from '../shared/services/notification.service';
import { UserService } from '../shared/services/user.service';
import { format24HourDateTime } from '../shared/utils/displayUtils';
import { DisplayNotifComponent } from './display-notif/display-notif.component';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [DisplayNotifComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private userService = inject(UserService);
  notificationList = this.notificationService.notificationList;
  notificationListWithDate = computed(() =>
    this.notificationList().map((notification: Notification) => {
      notification.date = format24HourDateTime(notification.timestamp);
      return notification;
    }),
  );

  notificationListReversed = computed(() =>
    this.notificationListWithDate().reverse(),
  );

  ngOnInit(): void {
    this.userService.getUserProfile();
    this.notificationService.getNotifications();
  }

  onDeleteNotificationHandler(notificationId: number) {
    console.log('Delete notification with id: ', notificationId);
    this.notificationService.deleteNotification(notificationId);
  }
}
