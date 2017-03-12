import {Component, OnInit} from '@angular/core';
import {LoggerService} from "../shared/logger.service";
import {Response} from "@angular/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(private loginService: LoggerService, private router: Router) {
  }

  onLogIn() {
    this.loginService.logIn(this.user).subscribe(
      (res: Response) => {
        this.loginService.saveToken(res["token"]);
        this.router.navigate([""])
      },
      error => {
        if (error.status == 400) {
          alert("Usuario o contraseña invalidos");
        } else {
          alert("No se establecio conexion con el servidor, intentelo nuevamente");
        }
      }
    );
  }

  ngOnInit() {}

}
