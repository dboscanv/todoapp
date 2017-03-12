import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {AppSettings} from "../app.constant";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';


@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  getUsers() {
    const headers = new Headers();
    headers.append("Authorization", "Token " + localStorage.getItem("token"));
    return this.http.get(AppSettings.server + "users/", {headers: headers}).map((res: Response) => res.json());
  }

  deleteUser(id) {
    const headers = new Headers();
    headers.append("Authorization", "Token " + localStorage.getItem("token"));
    return this.http.delete(AppSettings.server + "users/" + id, {headers: headers}).map((res: Response)=> res.json());
  }

  addUser(user) {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Token " + localStorage.getItem("token"));
    return this.http.post(AppSettings.server + "users/", body, {headers: headers}).map((res: Response)=>res.json());
  }


}
