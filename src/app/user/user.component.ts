import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  users = [];
  user = {};

  constructor(private userService: UserService) {
  }

  onAddUser() {
    this.userService.addUser(this.user).subscribe(data=>{
      this.users.push(data);
    }, error => {
      if (error.status == 400) {
        alert("Faltan campos");
      } else {
        alert("Ha ocurrido un error, por favor intentelo nuevamente");
      }
    })
  }

  onDeleteUser(user_id) {
    this.userService.deleteUser(user_id).subscribe(data=> {
      if (data == null) {
        alert("Borrado exitosamente!");
        this.users = this.users.filter(e => {
          return e.id !== user_id
        });
      }
    }, error => {
      if (error.status == 404) {
        alert("El usuario no existe");
      } else if (error.status == 403) {
        alert("No tienes los permisos para entrar aqui!");
      } else {
        alert("Ha ocurrido un error, intetelo nuevamente");
      }
    })
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(data=>this.users = data, error => {
      if (error.status == 403) {
        alert("No tienes los permisos para entrar aqui!");
      } else {
        alert("Ha ocurrido un error, intetelo nuevamente");
      }
    });

  }

}
