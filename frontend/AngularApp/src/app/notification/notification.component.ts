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

  notificationListReversed = computed(() => this.notificationList().reverse());

  ngOnInit(): void {
    this.notificationService.getNotifications();
  }

  onDeleteNotificationHandler(notificationId: number) {
    console.log('Delete notification with id: ', notificationId);
    this.notificationService.deleteNotification(notificationId);
  }
}
