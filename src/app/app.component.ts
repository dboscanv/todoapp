import {Component, OnInit} from '@angular/core';
import {LoggerService} from "./shared/logger.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [LoggerService]
})
export class AppComponent implements OnInit {
  private loggedFlag;

  constructor(private loggedService: LoggerService, private router: Router) {
    this.loggedFlag = false;
  }

  ngOnInit() {
    this.loggedService.loginFlag.subscribe(data => this.loggedFlag = data);

    if (this.loggedService.isLogged()) {
      this.router.navigate([""])
    } else {
      this.router.navigate(["login"])

    }
  }

  onLogout() {
    this.loggedService.logOut();
    this.router.navigate(["login"]);
  }

}
