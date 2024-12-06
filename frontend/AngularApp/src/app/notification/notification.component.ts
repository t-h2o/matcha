import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../UI/card/card.component';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
  private notificationService = inject(NotificationService);
  notificationList = this.notificationService.notificationList;

  ngOnInit(): void {
    this.notificationService.getNotifications();
  }
}
