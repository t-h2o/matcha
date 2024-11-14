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
export class GeocodingService {
    


}