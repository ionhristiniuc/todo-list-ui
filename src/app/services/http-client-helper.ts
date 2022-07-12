import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({providedIn: 'root'})
export class HttpClientHelper {

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  getItems<T>(url: string) {
    const options = {
      headers: this.getCommonHeaders(),
      params: new HttpParams(),
      withCredentials: true
    };
    return this.http.get<T>(url, options);
  }

  postItem(url: string, body: any, includeAuth: boolean = true) {
    const options = {
      body: body,
      headers: this.getCommonHeaders(includeAuth),
      params: new HttpParams(),
      withCredentials: true
    };

    return this.http.post(url, options.body, options);
  }

  put(url: string, body: any) {
    const options = {
      body: body,
      headers: this.getCommonHeaders(),
      params: new HttpParams(),
      withCredentials: true
    };

    return this.http.put(url, options.body, options);
  }

  delete(url: string) {
    const options = {
      headers: this.getCommonHeaders(),
      params: new HttpParams(),
      withCredentials: true
    };
    this.http.delete(url, options)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });
  }

  private getCommonHeaders(includeAuth: boolean = true): any {
    let headers: any = {};

    if (includeAuth && this.tokenService.isAuthenticated) {
      headers['Authorization'] = `Bearer ${this.tokenService.currentUserTokenValue}`;
    }

    return new HttpHeaders(headers);
  }
}
