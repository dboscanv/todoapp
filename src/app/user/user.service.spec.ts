import {UserService} from "./user.service";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {TestBed, inject} from "@angular/core/testing";
import {BaseRequestOptions, Http, ResponseOptions, Response} from "@angular/http";
import {users, user} from "../../testing/mock.users";

describe("Service: UserService", () => {
  let userService: UserService;
  let mockbackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
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


  beforeEach(inject([UserService, MockBackend], (service: UserService, backend: MockBackend) => {
    userService = service;
    mockbackend = backend;
  }));

  it("get list of users", () => {
    let response = new ResponseOptions({
      body: JSON.stringify(users)
    });

    const baseResponse = new Response(response);

    mockbackend.connections.subscribe(
      (c: MockConnection) => c.mockRespond(baseResponse)
    );

    return userService.getUsers().subscribe(data => expect(data).toEqual(users));

  });

  it("add user", () => {
    let response = new ResponseOptions({
      body: JSON.stringify(user)
    });

    const baseResponse = new Response(response);

    mockbackend.connections.subscribe(
      (c: MockConnection) => c.mockRespond(baseResponse)
    );

    return userService.addUser(user).subscribe(data => expect(data).toEqual(user));
  });

  it("delete user", () => {
    let response = new ResponseOptions({
      body: null
    });

    const baseResponse = new Response(response);

    mockbackend.connections.subscribe(
      (c: MockConnection) => c.mockRespond(baseResponse)
    );

    return userService.deleteUser(user).subscribe(data => expect(data).toBeNull());
  });


});
