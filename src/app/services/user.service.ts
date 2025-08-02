import { Injectable } from '@angular/core';
import { Constants } from '../classes/constants';
import { HttpClient } from '@angular/common/http';
import { Login } from '../classes/login';
import { Observable } from 'rxjs';
import { SignUp } from '../classes/sign-up';
import { LoginResp } from '../interfaces/login-resp';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userPath: string = Constants.rootURL + "users";
  private tokenKey: string = "token";
  private userKey: string = "user";

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

  storeJwtToken(body: LoginResp) {
    localStorage.setItem(this.tokenKey, body.type + " " + body.token)
  }

  getJwtToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  
  cleanJwtToken() {
    localStorage.removeItem(this.tokenKey)
  }

  storeUser(body: LoginResp) {
    localStorage.setItem(this.userKey, JSON.stringify(body.user))
  }

  currentUser(): User | undefined {
    const user = localStorage.getItem(this.userKey);
    if (user) {
      return JSON.parse(user)
    }
    return undefined
  }

  remove() {
    return this.http.delete(this.userPath)
  }

  createTgBotToken(): Observable<any> {
    return this.http.post(this.userPath + "/bot-token", null)
  }
}
