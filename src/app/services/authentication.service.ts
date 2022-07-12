import { HttpClientHelper } from './http-client-helper';
import { AuthorizationService } from './authorization.service';
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private baseUrl: string = 'api/account/token';
  constructor(private httpClientHelper: HttpClientHelper, private authorizationService: AuthorizationService) {}

  authenticate(email: string, password: string) {
    this.httpClientHelper.postItem(this.baseUrl, {email: email, password: password})
      .subscribe((response: any) => {
        console.log(response);

        this.authorizationService.token = response.token;
      }, error => {
        console.error(error);
      });
  }
}
