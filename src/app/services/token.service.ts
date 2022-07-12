import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TokenService {
  public get currentUserTokenValue(): string {
    return localStorage.getItem('currentUser') as string;
  }

  public get isAuthenticated(): boolean {
    return !!this.currentUserTokenValue;
  }

  removeToken() {
    localStorage.removeItem('currentUser');
  }

  setToken(token: string) {
    localStorage.setItem('currentUser', token)
  }
}
