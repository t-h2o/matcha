import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  FilterPotentialMatch,
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
import { Notification } from '../models/message';

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
      `${this.baseUrl}/profile`,
      userData,
    );
  }

  getUser() {
    return this.httpClient.get<UserData>(`${this.baseUrl}/profile`);
  }

  getUserByUsername(username: string) {
    return this.httpClient.get<UserData>(
      `${this.baseUrl}/profile?username=${username}`,
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

  deletePicture(url: string) {
    console.log('httprequest send: ' + url);
    return this.httpClient.delete<{ pictures: string }>(
      `${this.baseUrl}/pictures`,
      { body: { url } },
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

  filterPotentialMatches(filterPotentialMatch: FilterPotentialMatch) {
    return this.httpClient.post<PossibleMatchesUserData[]>(
      `${this.baseUrl}/browsing`,
      filterPotentialMatch,
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
    return this.httpClient.post<{ isLiked: boolean }>(
      `${this.baseUrl}/like-user`,
      data,
    );
  }

  getNotifications() {
    return this.httpClient.get<Notification[]>(`${this.baseUrl}/notification`);
  }

  deleteNotification(notificationId: number) {
    return this.httpClient.delete(
      `${this.baseUrl}/notification/${notificationId}`,
    );
  }

  deleteAccount() {
    return this.httpClient.get(`${this.baseUrl}/deleteme`);
  }
}
