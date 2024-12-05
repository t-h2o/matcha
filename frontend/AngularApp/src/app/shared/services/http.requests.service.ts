import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  ModifiedUserEmail,
  ModifiedUserGeneral,
  ModifiedUserPassword,
  ModifyGeneralData,
  PossibleMatchesUserData,
  UserData,
  UserLogin,
  UserRegister,
} from '../models/data-to-api/user';
import { token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  login(loginData: UserLogin) {
    return this.httpClient.post<token>(`${this.baseUrl}/login`, loginData);
  }

  register(userData: UserRegister) {
    return this.httpClient.post(`${this.baseUrl}/register`, userData);
  }

  modifyUser(userData: ModifyGeneralData) {
    return this.httpClient.put<ModifiedUserGeneral>(
      `${this.baseUrl}/users`,
      userData,
    );
  }

  getUser() {
    return this.httpClient.get<UserData>(`${this.baseUrl}/users`);
  }

  getUserByUsername(username: string) {
    return this.httpClient.get<UserData>(
      `${this.baseUrl}/users?username=${username}`,
    );
  }

  modifyEmail(userData: ModifiedUserEmail) {
    return this.httpClient.put<ModifiedUserEmail>(
      `${this.baseUrl}/email`,
      userData,
    );
  }

  getEmail() {
    return this.httpClient.get<{ email: string }>(`${this.baseUrl}/email`);
  }

  modifyPassword(userData: ModifiedUserPassword) {
    return this.httpClient.put(`${this.baseUrl}/modify-password`, userData);
  }

  modifyInterestsRequest(userData: { interests: string[] }) {
    return this.httpClient.put<{ interests: string[] }>(
      `${this.baseUrl}/interests`,
      userData,
    );
  }

  getInterests() {
    return this.httpClient.get<{ interests: string[] }>(
      `${this.baseUrl}/interests`,
    );
  }

  modifyPictures(pictures: File[]) {
    const formData = new FormData();
    pictures.forEach((picture) => formData.append('pictures', picture));
    return this.httpClient.post<{ pictures: string[] }>(
      `${this.baseUrl}/pictures`,
      formData,
    );
  }

  modifyProfilePicture(selectedPictures: string) {
    return this.httpClient.put<{ selectedPicture: string }>(
      `${this.baseUrl}/modify-profile-picture`,
      {
        selectedPictures,
      },
    );
  }

  getPictures() {
    return this.httpClient.get<{ pictures: string[] }>(
      `${this.baseUrl}/pictures`,
    );
  }

  resetPassword(resetData: { username: string }) {
    return this.httpClient.post(`${this.baseUrl}/reset-password`, resetData);
  }

  getPotentialMatches() {
    return this.httpClient.get<PossibleMatchesUserData[]>(
      `${this.baseUrl}/browsing`,
    );
  }

  visitProfile(username: string) {
    return this.httpClient.post<{ username: string }>(
      `${this.baseUrl}/visit-profile`,
      {
        username,
      },
    );
  }

  toggleLike(data: { dislike: string } | { like: string }) {
    return this.httpClient.post(`${this.baseUrl}/like-user`, data);
  }
}
