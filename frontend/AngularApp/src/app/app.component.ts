import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponentSimple } from './login/navbarSimple/navbarsimple.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponentSimple],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-app';
}
