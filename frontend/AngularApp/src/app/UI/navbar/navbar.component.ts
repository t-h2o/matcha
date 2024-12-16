import { Component, computed, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { token } from '../../shared/models/token';
import { AuthService } from '../../shared/services/auth.service';
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
  user = this.usersService.ownProfileData;
  profileCompleted = computed(() => this.user().profile_complete);

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
}
