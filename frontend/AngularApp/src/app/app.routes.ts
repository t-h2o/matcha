import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrowsingComponent } from './browsing/browsing.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RegisterProfileComponent } from './register-profile/register-profile.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'browsing',
    component: BrowsingComponent,
  },
  {
    path: 'register-profile',
    component: RegisterProfileComponent,
  },
];
