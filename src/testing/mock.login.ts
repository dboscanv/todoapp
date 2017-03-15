import {Observable} from "rxjs";

export const MockLogin = {
  "token": "b1dbec996a44d06060be029f712f52891a182cb8" //Example token
};

export const onLoginService = {
  logIn: function () {
    return Observable.of(MockLogin);
  },
  saveToken: function () {
    localStorage.setItem("token", MockLogin.token);
  },
  getToken: function () {
    return localStorage.getItem("token");
  }
};

export class RouterStub {
  navigate(commands: any[]) {
  }
}

