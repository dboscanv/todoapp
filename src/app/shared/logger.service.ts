import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import {AppSettings} from "../app.constant";


@Injectable()
export class LoggerService {
  loginFlag = new EventEmitter<boolean>();

  constructor(private http: Http) {

  }

  isLogged () {
    if (typeof this.getToken() !== "undefined" && this.getToken() !== null) {
      this.loginFlag.emit(true);
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  saveToken (token) {
    localStorage.setItem("token", token);
    this.loginFlag.emit(true);
  }

  logIn(credentials: any) {
    const body = JSON.stringify(credentials);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.post(AppSettings.server + "login/", body, {headers: headers}).map((response: Response) => response.json());
  }

  logOut () {
    localStorage.removeItem("token");
    this.loginFlag.emit(false);
  }

}
