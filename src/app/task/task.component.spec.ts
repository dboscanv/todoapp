import {TestBed, ComponentFixture, async} from "@angular/core/testing";
import {TaskComponent} from "./task.component";
import {TaskService} from "./task.service";
import {taskService, tasks, simple_task} from "../../testing/mock.task";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {Observable} from "rxjs";

describe("TaskComponent", () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let task_Service: TaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: TaskService, useValue: taskService},
      ],
      declarations: [TaskComponent],
      imports: [FormsModule, HttpModule]
    })
      .compileComponents(); // compile template and css
  }));

  //Creation of component
  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    task_Service = fixture.debugElement.injector.get(TaskService);
  });

  /****
   * Test
   */

  it("on init get all tasks", () => {
    spyOn(task_Service, "getTasks").and.returnValue(Observable.of(tasks));
    component.ngOnInit();
    expect(component.tasks.length).toBe(3);
    expect(task_Service.getTasks).toHaveBeenCalled();
  });

  it("should the new task add in the list and delete the name of field", () => {
    spyOn(task_Service, "addTask").and.returnValue(Observable.of(simple_task));
    let size = component.tasks.length;
    component.onAddTask();
    expect(component.tasks.length).toBe(size + 1);
    expect(component.new_task).toBe("");
  });

  it("on delete task should delete that task in the list", () => {
    return spyOn(task_Service, "deleteTask").and.returnValue(Observable.of(null));
    let size = component.tasks.length;
    component.onDelete(simple_task);
    expect(component.task.length).toBe(size - 1);
  });


});
