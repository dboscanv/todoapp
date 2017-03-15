import {AppComponent} from "./app.component";
import {ComponentFixture, async, TestBed} from "@angular/core/testing";
import {LoggerService} from "./shared/logger.service";
import {RouterStub} from "../testing/mock.login";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loggerService: LoggerService;
  let router: Router;

  const loggerServiceStub = {
    isLogged: true,
    loginFlag: Observable.of(true)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: LoggerService, useValue: loggerServiceStub},
        {provide: Router, useClass: RouterStub}
      ],
      declarations: [AppComponent],
      imports: [FormsModule, HttpModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents(); // compile template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent); //Return: component and debug element (debug DOM)
    //fixture.debugElement
    component = fixture.componentInstance; //Component instance
    fixture.detectChanges();

    // Obtener servicios del componente
    loggerService = fixture.debugElement.injector.get(LoggerService);
    router = fixture.debugElement.injector.get(Router);
  });

  /** Test **/
  it("on init if not logged", () => {
    loggerService.isLogged = false;
    spyOn(loggerService, "isLogged");
    spyOn(loggerService, "loginFlag").and.returnValue(Observable.of(true));
    spyOn(router, "navigate");
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(["login"])
  });

  it("on init if logged", () => {
    // loggerService.isLogged = true;
    spyOn(loggerService, "isLogged").and.returnValue(true);
    spyOn(loggerService, "loginFlag").and.returnValue(Observable.of(true));
    spyOn(router, "navigate");
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith([""])
  });

});
