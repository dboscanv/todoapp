import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
import {TaskComponent} from "./task/task.component";
import {UserComponent} from "./user/user.component";

const APP_ROUTES: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", component: TaskComponent},
  {path: "user", component: UserComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
