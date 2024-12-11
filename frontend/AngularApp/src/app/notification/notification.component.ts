import { Component, computed, inject, OnInit } from '@angular/core';
import { NotificationService } from '../shared/services/notification.service';
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
  notificationList = this.notificationService.notificationList;

  notificationListReversed = computed(() => this.notificationList().reverse());

  ngOnInit(): void {
    this.notificationService.getNotifications();
  }

  onDeleteNotification(notificationId: number) {
    this.notificationService.deleteNotification(notificationId);
  }
}
