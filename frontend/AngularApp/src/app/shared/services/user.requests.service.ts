import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  UserLogin,
  ModifiedUserEmail,
  ModifiedUserGeneral,
  ModifiedUserPassword,
  UserRegister,
} from '../models/data-to-api/user';
import { token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class UserRequestsService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  login(loginData: UserLogin) {
    return this.httpClient.post<token>(`${this.baseUrl}/login`, loginData);
  }

  register(userData: UserRegister) {
    return this.httpClient.post(`${this.baseUrl}/register`, userData);
  }

  modifyGeneral(userData: ModifiedUserGeneral) {
    return this.httpClient.put(`${this.baseUrl}/modify-general`, userData);
  }

  modifyEmail(userData: ModifiedUserEmail) {
    return this.httpClient.put(`${this.baseUrl}/modify-email`, userData);
  }

  modifyPassword(userData: ModifiedUserPassword) {
    return this.httpClient.put(`${this.baseUrl}/modify-password`, userData);
  }

  modifyInterests(userData: { interests: string[] }) {
    return this.httpClient.put(`${this.baseUrl}/interests`, userData);
  }

  modifyPictures(pictures: File[]) {
    const formData = new FormData();
    pictures.forEach((picture) => formData.append('pictures', picture));
    return this.httpClient.post(`${this.baseUrl}/modify-pictures`, formData);
  }

  modifyProfilePicture(selectedPictures: string) {
    return this.httpClient.put(`${this.baseUrl}/modify-profile-picture`, {
      selectedPictures,
    });
  }

  getInterests() {
    return this.httpClient.get<{ interests: string[] }>(
      `${this.baseUrl}/interests`,
    );
  }
}
