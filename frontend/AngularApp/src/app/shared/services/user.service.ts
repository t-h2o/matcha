import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  login(loginData: { username: string; password: string }) {
    return this.httpClient.post<token>(`${this.baseUrl}/login`, loginData);
  }
}
