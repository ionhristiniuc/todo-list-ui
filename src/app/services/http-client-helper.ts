import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthorizationService } from "./authorization.service";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class HttpClientHelper {

  constructor(private http: HttpClient, private authorizationService: AuthorizationService) {
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

    if (includeAuth && this.authorizationService.isAuthenticated) {
      headers['Authorization'] = `Bearer ${this.authorizationService.token}`;
    }

    return new HttpHeaders(headers);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
