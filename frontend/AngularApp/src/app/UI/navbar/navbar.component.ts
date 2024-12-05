import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { token } from '../../shared/models/token';
import { AuthService } from '../../shared/services/auth.service';
import { SocketService } from '../../shared/services/socket.service';
import { UserService } from '../../shared/services/user.service';

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
