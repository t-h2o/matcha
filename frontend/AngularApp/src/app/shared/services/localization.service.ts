import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  location = signal<LocationCoordinates>({
    latitude: 999,
    longitude: 0,
    accuracy: 0,
  });

  getCurrentPosition(): Observable<LocationCoordinates> {
    return new Observable((observer) => {
      if (!navigator.geolocation) {
        observer.error('Geolocation is not supported by your browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          this.location.set(coordinates);
          observer.next(coordinates);
          observer.complete();
        },
        (error: GeolocationPositionError) => {
          observer.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    });
  }
}
