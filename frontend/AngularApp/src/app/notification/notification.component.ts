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
  notificationList2 = signal<Notification[]>([
    {
      id: 1,
      title: 'Notification 1',
      content: 'This is the first notification',
      date: '2021-09-01',
    },
    {
      id: 2,
      title: 'Notification 2',
      content: 'This is the second notification',
      date: '2021-09-01',
    },
    {
      id: 3,
      title: 'Notification 3',
      content: 'This is the third notification',
      date: '2021-09-01',
    },
  ]);

  notificationListReversed = computed(() => this.notificationList2().reverse());

  ngOnInit(): void {
    this.notificationService.getNotifications();
  }

  onDeleteNotificationHandler(notificationId: number) {
    console.log('Delete notification with id: ', notificationId);
    this.notificationService.deleteNotification(notificationId);
  }
}
