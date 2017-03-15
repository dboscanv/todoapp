import {Observable} from "rxjs";

export const tasks = [
  {
    id: 1,
    name: "Task one",
    status: false,
    owner: "admin",
  },
  {
    id: 2,
    name: "Task two",
    status: false,
    owner: "admin",
  },
  {
    id: 3,
    name: "Task three",
    status: true,
    owner: "admin",
  },
];

export const simple_task = {
  id: 1,
  name: "Task one",
  status: false,
  owner: "admin",
};

export const taskService = {
  editTask: function (task) {
    return Observable.of(task);
  },
  deleteTask: function (task) {
    return Observable.of(null);
  },
  addTask: function (task) {
    return Observable.of(task);
  },
  getTasks: function () {
    return Observable.of(tasks);
  }
};
