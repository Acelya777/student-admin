import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey='token';
  private baseApiUrl ='http://localhost:8080';
  public username!: String;
  public password!: String;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  constructor(
    private router: Router,
    private http:HttpClient
  ) { }

  login(username:string , password:string) {
    return this.http.get(`http://localhost:8080/basicauth`,
    { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res: any) => {
      this.username = username;
      this.password = password;
      this.registerSuccessfulLogin(username, password);
    }));
  }
  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }
  registerSuccessfulLogin(username: string, password: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }
  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
