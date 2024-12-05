import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SearchComponent } from './search/search.component';
import { GuestGuard } from './guest.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UserDetailComponent } from './search/user-detail/user-detail.component';
import { ChatComponent } from './chat/chat.component';
import { ModifyEmailComponent } from './profile/modify-email/modify-email.component';
import { ModifyGeneralComponent } from './profile/modify-general/modify-general.component';
import { ModifyInterestsComponent } from './profile/modify-interests/modify-interests.component';
import { ModifyPicturesComponent } from './profile/modify-pictures/modify-pictures.component';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import { NotificationComponent } from './notification/notification.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'modify-general',
    component: ModifyGeneralComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'modify-interests',
    component: ModifyInterestsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'modify-email',
    component: ModifyEmailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'modify-pictures',
    component: ModifyPicturesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search/:username',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat/:username',
    component: ChatroomComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    component: NotificationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];
