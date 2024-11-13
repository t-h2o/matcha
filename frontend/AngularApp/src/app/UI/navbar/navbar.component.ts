import { Component, inject, Input, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { token } from '../../shared/models/token';
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

  hasNewNotifications = signal<boolean>(true);

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  isRegisterRoute(): boolean {
    return this.router.url === '/register';
  }

  get token(): token | null | undefined {
    return this.authService.tokenSignal();
  }

  get profileComplete(): boolean {
    return this.usersService.ownProfileData().profile_complete;
  }
}
