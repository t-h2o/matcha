import { inject, Injectable, signal } from '@angular/core';
import { HttpRequestsService } from './http.requests.service';
import { ToastService } from './toast.service';
import { Notification } from '../models/message';


@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private httpService = inject(HttpRequestsService);
  private toastService = inject(ToastService);
  notificationList = signal<Notification[]>([]);

  getNotifications() {
    this.httpService.getNotifications().subscribe({
      next: (notifications: Notification[]) => {
        console.log("Notifications: " + notifications);
        this.notificationList.set(notifications);
      },
      error: (error: any) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }

  deleteNotification(notificationId: number) {
    this.httpService.deleteNotification(notificationId).subscribe({
      next: () => {
        this.notificationList.update((prev) => {
          return prev.filter((notification) => notification.id !== notificationId);
        });
        this.toastService.show('Notification deleted successfully', 'success');
      },
      error: (error: any) => {
        const errorMessage = error?.message || 'An unknown error occurred';
        this.toastService.show(errorMessage, 'error');
      },
    });
  }
}
