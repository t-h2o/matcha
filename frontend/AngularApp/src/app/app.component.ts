import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './UI/navbar/navbar.component';
import { FooterComponent } from './UI/footer/footer.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.authService.tokenSignal.set({ access_token: token });
    }
  }

  logoutHandler() {
    this.authService.tokenSignal.set(null);
    localStorage.removeItem('access_token');
  }
}
