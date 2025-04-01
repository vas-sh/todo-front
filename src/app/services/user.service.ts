import { Injectable } from '@angular/core';
import { Constants } from '../classes/constants';
import { HttpClient } from '@angular/common/http';
import { Login } from '../classes/login';
import { Observable } from 'rxjs';
import { SignUp } from '../classes/sign-up';
import { JwtToken } from '../interfaces/jwt-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userPath: string = Constants.rootURL + "users";
  private tokenKey: string = "token";

  constructor(
    private http: HttpClient
  ) { }

  signUp(body: SignUp): Observable<any> {
    return this.http.post(this.userPath + "/sign-up", body.serialise())
  }

  login(body: Login): Observable<any> {
    return this.http.post(this.userPath + "/login", body.serialise())
  }

  confirm(id: string): Observable<any> {
    return this.http.get(this.userPath + "/confirm/" + id)
  }

  storeJwtToken(body: JwtToken) {
    sessionStorage.setItem(this.tokenKey, body.type + " " + body.token)
  }

  getJwtToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }
  
  cleanJwtToken() {
    sessionStorage.removeItem(this.tokenKey)
  }
}
