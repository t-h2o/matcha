import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.tokenSignal()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (
      !this.userService.ownProfileData().profile_complete &&
      route.routeConfig?.path !== 'profile'
    ) {
      this.router.navigate(['/profile']);
      return false;
    }

    return true;
  }
}
