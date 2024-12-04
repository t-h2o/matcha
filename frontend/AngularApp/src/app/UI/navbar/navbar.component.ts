import { Component, inject, Input, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { token } from '../../shared/models/token';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { SocketService } from '../../shared/services/socket.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() onLogout!: () => void;
  private authService = inject(AuthService);
  private router = inject(Router);
  private usersService = inject(UserService);
  private socketService = inject(SocketService);

  hasNewNotifications = signal<boolean>(true);

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  isRegisterRoute(): boolean {
    return this.router.url === '/register';
  }

  isProfileRoute(): boolean {
    return this.router.url === '/profile';
  }

  get token(): token | null | undefined {
    return this.authService.tokenSignal();
  }

  get profileComplete(): boolean {
    return this.usersService.ownProfileData().profile_complete;
  }

  onMessage(): void {
    this.socketService.sendMessage('Navbar say hi!');
  }
}
