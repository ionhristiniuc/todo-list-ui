import { HttpClientHelper } from './http-client-helper';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TokenService } from "./token.service";

@Injectable({providedIn: 'root'})
export class AuthService {
  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;
  private baseUrl: string = 'api/account/token';

  constructor(private httpClientHelper: HttpClientHelper, private tokenService: TokenService) {
    this.currentUserSubject = new BehaviorSubject<string>(tokenService.currentUserTokenValue);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserTokenValue(): string {
    return this.currentUserSubject.value;
  }

  public get isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated;
  };

  login(email: string, password: string) {
    return this.httpClientHelper.postItem(this.baseUrl, {email: email, password: password})
      .pipe(map((authResponse: any) => {
        this.tokenService.setToken(authResponse.token);
      }))
  }

  logout() {
    this.tokenService.removeToken();
  }
}
