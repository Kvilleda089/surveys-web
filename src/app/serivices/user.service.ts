import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user.inteface';
import { LoginResponse } from '../interface/login-response.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse>{
    const url = `${this.apiURL}/users/login`;
    return this.http.post<LoginResponse>(url, {email, password});
  }

  saveUser(email: string, password:string): Observable<LoginResponse>{
    const url = `${this.apiURL}/users`;
    return this.http.post<LoginResponse>(url, {email, password});
  }
}
