import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './UI/footer/footer.component';
import { NavbarComponent } from './UI/navbar/navbar.component';

import { ErrorModalComponent } from './shared/modal/error-modal/error-modal.component';
import { AuthService } from './shared/services/auth.service';
import { ErrorService } from './shared/services/error.service';
import { ToastComponent } from './shared/modal/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ErrorModalComponent,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private errorService = inject(ErrorService);

  error = this.errorService.error;

  ngOnInit() {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      this.authService.tokenSignal.set({ access_token: token });
    }
  }

  logoutHandler() {
    this.authService.tokenSignal.set(null);
    sessionStorage.removeItem('access_token');
  }
}
