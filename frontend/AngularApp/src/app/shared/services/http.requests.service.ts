import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  FilterPotentialMatch,
  LocationCoordinates,
  ModifiedUserEmail,
  ModifiedUserGeneral,
  ModifiedUserPassword,
  ModifyGeneralData,
  PossibleMatchesUserData,
  UserData,
  UserLogin,
  UserRegister,
} from '../models/data-to-api/user';
import {
  ChatMessageFromBack,
  ChatMessageToBack,
  Notification,
} from '../models/message';
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
      `${this.baseUrl}/profile`,
      userData,
    );
  }

  getUser() {
    return this.httpClient.get<UserData>(`${this.baseUrl}/profile`);
  }

  getUserByUsername(username: string) {
    return this.httpClient.get<UserData>(`${this.baseUrl}/profile/${username}`);
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
      `${this.baseUrl}/profile-picture`,
      {
        selectedPictures,
      },
    );
  }

  deletePicture(url: string) {
    return this.httpClient.delete<{ pictures: string }>(
      `${this.baseUrl}/pictures`,
      { body: { url: [url] } },
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

  toggleLike(data: { unlike: string } | { like: string }) {
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

  getAllMsgByUsername(username: string) {
    return this.httpClient.get(`${this.baseUrl}/chat/${username}`);
  }

  sendMessage(message: ChatMessageToBack) {
    return this.httpClient.post<ChatMessageFromBack>(
      `${this.baseUrl}/chat`,
      message,
    );
  }

  sendCoordinates(coords: LocationCoordinates) {
    return this.httpClient.post<LocationCoordinates>(
      `${this.baseUrl}/position`,
      coords,
    );
  }

  reportFake(payload: { fake: string } | { unfake: string }) {
    return this.httpClient.post(`${this.baseUrl}/fake`, payload);
  }

  getAllMatches() {
    return this.httpClient.get<String[]>(`${this.baseUrl}/match`);
  }

  blockUser(payload: { block: string } | { unblock: string }) {
    return this.httpClient.post(`${this.baseUrl}/block`, payload);
  }

  confirmEmail() {
    return this.httpClient.get(`${this.baseUrl}/confirm`);
  }

  verifyEmailToken(token: string) {
    return this.httpClient.get(`${this.baseUrl}/confirm/${token}`);
  }

  sendNewPassword(payload: { password: string }, token: string) {
    return this.httpClient.post(
      `${this.baseUrl}/reset-password/${token}`,
      payload,
    );
  }
}
