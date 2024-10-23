import { Injectable, signal } from "@angular/core";
import { token } from "../shared/models/token";



@Injectable({
    providedIn: 'root'
})
export class AuthService {
    tokenSignal = signal<token | undefined | null>(undefined);
    }