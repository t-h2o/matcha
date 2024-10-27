import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  UserLogin,
  UserModifyEmail,
  UserModifyGeneral,
  UserModifyPassword,
  UserRegister,
} from '../models/data-to-api/user';
import { token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  login(loginData: UserLogin) {
    return this.httpClient.post<token>(`${this.baseUrl}/login`, loginData);
  }

  register(userData: UserRegister) {
    return this.httpClient.post(`${this.baseUrl}/register`, userData);
  }

  modifyGeneral(userData: UserModifyGeneral) {
    return this.httpClient.put(`${this.baseUrl}/modify-general`, userData);
  }
  modifyEmail(userData: UserModifyEmail) {
    return this.httpClient.put(`${this.baseUrl}/modify-email`, userData);
  }

  modifyPassword(userData: UserModifyPassword) {
    return this.httpClient.put(`${this.baseUrl}/modify-password`, userData);
  }
}
