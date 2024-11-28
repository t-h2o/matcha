import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './UI/footer/footer.component';
import { NavbarComponent } from './UI/navbar/navbar.component';

import { AuthService } from './shared/services/auth.service';
import { ToastComponent } from './shared/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

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
