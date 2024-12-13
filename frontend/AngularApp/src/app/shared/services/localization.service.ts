import { inject, Injectable, signal } from '@angular/core';
import { HttpRequestsService } from './http.requests.service';
import { LocationCoordinates } from '../models/data-to-api/user';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private httpService = inject(HttpRequestsService);
  private toastService = inject(ToastService);
  location = signal<LocationCoordinates>({
    latitude: 999,
    longitude: 0,
    accuracy: 0,
  });

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        this.location.set(coordinates);
        this.httpService.sendCoordinates(coordinates).subscribe({
          next: (data: any) => {
            this.location.update((prev) => {
              return {
                ...prev,
                latitude: data.latitude,
                longitude: data.longitude,
              };
            });
          },
          error: (error: any) => {
            const errorMessage = error?.message || 'An unknown error occurred';
            this.toastService.show(errorMessage, 'error');
          },
        });
      },
      (_error) => {
        this.httpService.sendCoordinates(this.location()).subscribe({
          next: (data: any) => {
            this.location.update((prev) => {
              return {
                ...prev,
                latitude: data.latitude,
                longitude: data.longitude,
              };
            });
          },
          error: (error: any) => {
            const errorMessage = error?.message || 'An unknown error occurred';
            this.toastService.show(errorMessage, 'error');
          },
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }
}
