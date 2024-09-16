import { Inject } from "@angular/core";


@Inject({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token'

  constructor(){}

  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  };

  isAutenticate(): boolean{
    return !!this.getToken();
  }
}
