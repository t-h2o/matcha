import { Component, signal } from '@angular/core';
import { CardComponent } from '../UI/card/card.component';

const DUMMY_NOTIFICATIONS = [
  { id: 1, title: 'like', text: 'username has liked your profile' },
  { id: 2, title: 'view', text: 'username has viewed your profile' },
  { id: 3, title: 'message', text: 'username has send you a message' },
  { id: 4, title: 'unlike', text: 'username has unlike your profile' },
  { id: 5, title: 'match', text: 'you and username are a match' },
];

type Notification = {
  id: number;
  title: string;
  text: string;
};

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  notificationList = signal<Notification[]>(DUMMY_NOTIFICATIONS);
}
