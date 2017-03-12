import {Component, OnInit} from '@angular/core';
import {TaskService} from "./task.service";
import {Response} from "@angular/http";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {
  tasks = [];
  new_task = "";

  constructor(private taskService: TaskService) {
  }

  onEdit(task) {
    delete task.edit;
    this.taskService.editTask(task).subscribe((data: Response)=>console.log(data), error => console.log(error));
  }

  onDelete(task) {
    this.taskService.deleteTask(task).subscribe((data: Response)=> {
      if (data == null) {
        alert("Borrado exitosamente!");
        this.tasks = this.tasks.filter(e => {
          return e.id !== task.id
        });
      }
    }, error => {
      if (error.status == 404) {
        alert("La tarea no existe");
      } else {
        alert("Ha ocurrido un error, intetelo nuevamente");
      }
    });
  }

  onAddTask() {
    let obj = {"name": this.new_task};
    this.new_task = "";
    this.taskService.addTask(obj).subscribe(data => {
      console.log(this.tasks);
      this.tasks.push(data);
    }, error => {
      if (error.status == 400) {
        alert("Debes introducir un nombre valido");
      } else {
        alert("Ha ocurrido un error, por favor intentelo nuevamente");
      }
    });
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(data => data !== null ? this.tasks = data : null, error => alert("Ha ocurrido un error, intentelo nuevamente"))

  }

}
