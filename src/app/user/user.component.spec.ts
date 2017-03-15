import {TestBed, ComponentFixture, async} from "@angular/core/testing";
import {UserComponent} from "./user.component";
import {UserService} from "./user.service";
import {users, user} from "../../testing/mock.users";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {Observable} from "rxjs";

describe("UserComponent", () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService
      ],
      declarations: [UserComponent],
      imports: [FormsModule, HttpModule]
    })
      .compileComponents(); // compile template and css
  }));

  //Creation of component
  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = fixture.debugElement.injector.get(UserService);
  });

  /****
   * Test
   */

  it("on init get all users", () => {
    spyOn(userService, "getUsers").and.returnValue(Observable.of(users));
    component.ngOnInit();
    expect(component.users.length).toBe(3);
    expect(userService.getUsers).toHaveBeenCalled();
  });

  it("should the new user add in the list", () => {
    spyOn(userService, "addUser").and.returnValue(Observable.of(user));
    let size = component.users.length;
    component.onAddUser();
    expect(component.users.length).toBe(size + 1);
  });

  it("on delete user should delete that user in the list", () => {
    return spyOn(userService, "deleteUser").and.returnValue(Observable.of(null));
    let size = component.users.length;
    component.onDelete(user);
    expect(component.users.length).toBe(size - 1);
  });


});
