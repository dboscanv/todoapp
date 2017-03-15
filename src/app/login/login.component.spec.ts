/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {FormsModule} from "@angular/forms";
import {LoggerService} from "../shared/logger.service";
import {HttpModule} from "@angular/http";
import {RouterTestingModule} from '@angular/router/testing';
import {RouterStub, onLoginService} from "../../testing/mock.login";
import {Router} from "@angular/router";

describe('LoginComponent', () => {
  //Declarar servicios
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoggerService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: LoggerService, useValue: onLoginService},
        {provide: Router, useClass: RouterStub}
      ],
      imports: [FormsModule, RouterTestingModule, HttpModule],
      declarations: [LoginComponent]
    })
      .compileComponents(); // compile template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent); //Return: component and debug element (debug DOM)
    //fixture.debugElement
    component = fixture.componentInstance; //Component instance
    fixture.detectChanges();

    // Obtener servicios del componente
    loginService = fixture.debugElement.injector.get(LoggerService);
    router = fixture.debugElement.injector.get(Router);
  });

  /****
   * Test
   */

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save token and navigate to task', () =>{
    spyOn(loginService, "logIn").and.callThrough();
    spyOn(router, "navigate");
    component.onLogIn();
    let token = loginService.getToken();
    expect(token).not.toBeNull();
    expect(token).toBeDefined();
    expect(router.navigate).toHaveBeenCalledWith([""]);
  });




});
