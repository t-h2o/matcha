import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChatComponent } from './chat/chat.component';
import { ChatroomComponent } from './chat/chatroom/chatroom.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GuestGuard } from './guest.guard';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';
import { ModifyEmailComponent } from './profile/modify-email/modify-email.component';
import { ModifyGeneralComponent } from './profile/modify-general/modify-general.component';
import { ModifyInterestsComponent } from './profile/modify-interests/modify-interests.component';
import { AddPicturesComponent } from './profile/modify-pictures/add-pictures.component';
import { DeletePicturesComponent } from './profile/modify-pictures/delete-pictures/delete-pictures.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SearchComponent } from './search/search.component';
import { UserDetailComponent } from './search/user-detail/user-detail.component';

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
    path: 'add-pictures',
    component: AddPicturesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'delete-pictures',
    component: DeletePicturesComponent,
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
    path: 'delete-account',
    component: DeleteConfirmationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];
