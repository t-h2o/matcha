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
export class LocationService {
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
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              observer.error('User denied the request for Geolocation');
              break;
            case error.POSITION_UNAVAILABLE:
              observer.error('Location information is unavailable');
              break;
            case error.TIMEOUT:
              observer.error('The request to get user location timed out');
              break;
            default:
              observer.error('An unknown error occurred');
              break;
          }
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
