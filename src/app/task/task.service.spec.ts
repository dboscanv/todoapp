import {TaskService} from "./task.service";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {TestBed, inject} from "@angular/core/testing";
import {BaseRequestOptions, Http, ResponseOptions, Response} from "@angular/http";
import {tasks, simple_task} from "../../testing/mock.task";

describe("Service: TaskService", () => {
  let taskService: TaskService;
  let mockbackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });


  beforeEach(inject([TaskService, MockBackend], (service: TaskService, backend: MockBackend) => {
    taskService = service;
    mockbackend = backend;
  }));

  it("get list of task", () => {
    let response = new ResponseOptions({
      body: JSON.stringify(tasks)
    });

    const baseResponse = new Response(response);

    mockbackend.connections.subscribe(
      (c: MockConnection) => c.mockRespond(baseResponse)
    );

    return taskService.getTasks().subscribe(data => expect(data).toEqual(tasks));

  });

  it("edit task", () => {
    let response = new ResponseOptions({
      body: JSON.stringify(simple_task)
    });

    const baseResponse = new Response(response);

    mockbackend.connections.subscribe(
      (c: MockConnection) => c.mockRespond(baseResponse)
    );

    return taskService.editTask(simple_task).subscribe(data => expect(data).toEqual(simple_task));
  });

  it("delete task", () => {
    let response = new ResponseOptions({
      body: null
    });

    const baseResponse = new Response(response);

    mockbackend.connections.subscribe(
      (c: MockConnection) => c.mockRespond(baseResponse)
    );

    return taskService.deleteTask(simple_task).subscribe(data => expect(data).toBeNull());
  });

  it("add task", () => {
    let response = new ResponseOptions({
      body: simple_task
    });

    const baseResponse = new Response(response);

    mockbackend.connections.subscribe(
      (c: MockConnection) => c.mockRespond(baseResponse)
    );

    return taskService.addTask(simple_task).subscribe(data => expect(data).toEqual(simple_task));
  });

});
