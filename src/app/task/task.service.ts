import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {AppSettings} from "../app.constant";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class TaskService {

  constructor(private http: Http) {
  }

  getTasks() {
    const headers = new Headers();
    // headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Token " + localStorage.getItem("token"));
    return this.http.get(AppSettings.server + "users_task/", {headers: headers}).map((response: Response) => response.json());
  }

  editTask(task) {
    const headers = new Headers();
    const body = JSON.stringify(task);
    headers.append('Content-Type', 'application/json');
    headers.append("Authorization", "Token " + localStorage.getItem("token"));
    return this.http.put(AppSettings.server + "tasks/" + task.id + "/", body, {headers: headers}).map((response: Response)=> response.json());
  }

  deleteTask(task) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append("Authorization", "Token " + localStorage.getItem("token"));
    return this.http.delete(AppSettings.server + "tasks/" + task.id + "/", {headers: headers}).map((response: Response) => response.json());
  }

  addTask(task) {
    const headers = new Headers();
    const body = JSON.stringify(task);
    headers.append('Content-Type', 'application/json');
    headers.append("Authorization", "Token " + localStorage.getItem("token"));
    return this.http.post(AppSettings.server + "tasks/", body, {headers: headers}).map((response: Response) => response.json());
  }


}
