import {TestBed, inject} from "@angular/core/testing";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {BaseRequestOptions, Http, ResponseOptions, Response} from "@angular/http";
import {LoggerService} from "./logger.service";
import {MockLogin} from "../../testing/mock.login";

describe("Service: LoggerService", () => {
  let loggerService: LoggerService;
  let mockbackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          LoggerService,
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
      }
    );
  });

  beforeEach(inject([LoggerService, MockBackend], (service: LoggerService, backend: MockBackend) => {
    loggerService = service;
    mockbackend = backend;
  }));


  it("should create", () => {
    expect(loggerService).toBeTruthy();
  });

  it("should return boolean", () => {
    expect(typeof loggerService.isLogged()).toEqual("boolean");
  });

  it("should emit event logged", () => {
    loggerService.saveToken(MockLogin.token);
    loggerService.loginFlag.subscribe(data =>
      expect(data).toEqual(true)
    );
  });

  it("should return token", () => {
    expect(loggerService.getToken()).toEqual(MockLogin.token);
  });

  it("should delete token and emit event logout", () => {
    loggerService.logOut();
    loggerService.loginFlag.subscribe(data =>
      expect(data).toEqual(false)
    );
    expect(localStorage.getItem("token")).toBeNull();
  });

  it("should return token", () => {

    let response = new ResponseOptions({
      body: JSON.stringify(MockLogin)
    });

    const baseResponse = new Response(response);

    mockbackend.connections.subscribe(
      (c: MockConnection) => c.mockRespond(baseResponse)
    );

    return loggerService.logIn().subscribe(data => {
      expect(data).toEqual(MockLogin);
    });

  });


});
