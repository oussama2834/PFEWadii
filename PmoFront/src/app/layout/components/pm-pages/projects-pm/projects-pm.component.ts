import { Component, ViewEncapsulation } from '@angular/core';
import { Project } from 'src/app/_model/project.model';
import { User } from 'src/app/_model/user.model';
import { ProjectService } from 'src/app/_services/project.service';
import { StepService } from 'src/app/_services/step.service';
import { UserService } from 'src/app/_services/user.service';
import { Table } from 'primeng/table';
import { FormGroup, NgForm } from '@angular/forms';
import { Message } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { Step } from 'src/app/_model/step.model';
import { TaskService } from 'src/app/_services/task.service';
import { Task } from 'src/app/_model/task.model';
import { RoleService } from 'src/app/_services/role.service';
import { Role } from 'src/app/_model/role.model';


@Component({
  selector: 'app-projects-pm',
  templateUrl: './projects-pm.component.html',
  styleUrls: ['./projects-pm.component.scss']
})
export class ProjectsPmComponent {
  projectBeingEdited: number | null = null;
  stepBeingEdited: number | null = null;
  successMessage: string = '';
  msgs: Message[] = [];
  activityValues: number[] = [0, 100];
  step = new Step();
  role : Role[]=[];
  task: any = {};
  users: User[] = [];
  projectStepsViewed: number | null = null;
  productDialog: boolean = false;
  projects: Project[] = [];
  searchByname = "";
  activeIndex: number | undefined;
  ModalOpened = false;
  ModalStepOpened = false;
  ModalAssignOpened = false;
  currentStep = new Step();
  currentTask = new Task();
  currentProject = new Project();
  openedTaskIndexes: number[] = [];
  openedTaskIndex: number = -1;
  consultants: User[] = [];
  selectedConsultant = new User();
  items: string[] = [];
  label = ""
  taskEdited = new Task();
  currentItem = "";
  tasks: Task[] = [];
  steps: Step[] = [];
  ErrorExist = false;
  changeProgressType(idTask: number,item :string) {
    this.taskService.EditTask(idTask, item).subscribe({
      next:(data) => {
          this.taskEdited = data
        console.log(this.users)
        this.getTasks()
      },
      error:(err) => {
        console.log("An error was occured : " + err);
      }
    })

}

  constructor(private projectService: ProjectService,
    private stepService: StepService, private userService: UserService,
    private userauthservice: UserAuthService, private projectservice: ProjectService,
  private taskService : TaskService,private roleservice : RoleService) {
    this.getProjectsForPM();
    this.loadRoles();
    this.getConsultants();
    this.getTaskProgressType();
    this.getTasks();
  }
  ngOnInit() {

    this.Liststeps();


  }
  getTaskProgressType() {
    this.taskService.getTaskProgressType().subscribe(res => {
      this.items = res
      this.items = this.items.filter(item => item != "TODO")
      console.log(this.items)
    })
  }
  getTasks() {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res
      console.log(this.tasks)
    }
  )}
  getConsultants() {
    this.userService.List_consultatnts().subscribe(res => {
      this.consultants = res
      console.log(this.consultants)
    })
  }
  addStepClicked(project: any) {
    this.projectBeingEdited = project.projectId;
    this.step = new Step();
  }
  deleteStep(id: number) {
    this.stepService.deletestep(id).subscribe(res => {
      console.log(res)
    })
    location.reload();
  }
  deleteTask(id: number) {
    this.taskService.deletetask(id).subscribe(res => {
      console.log(res)
    })
  }
  deleteProject(id: number) {
    this.projectService.deleteproject(id).subscribe(res => {
      console.log(res)
      this.getProjectsForPM();
    })
  }
  addTaskClicked(step: any) {
    this.stepBeingEdited = step.stepId;
    this.task = {};
  }

  clear(table: Table) {
    table.clear();
}


  getProjectsForPM() {
    let username = this.userauthservice.getUser().userName
    this.projectService.getAllProjects().subscribe(res => {
      this.projects = res
      this.projects = this.projects.filter(project => project.user?.userName == username)
      console.log(this.projects)
    })

  }
  // addStepClicked(project: any) {
  //   this.projectBeingEdited = project.projectId;
  //   this.step = {};
  // }
  openNew() {
    this.productDialog = true;

  }
  hideDialog() {
    this.productDialog = false;
}


showSuccessViaMessages() {
  this.msgs = [];

  this.msgs.push({
    severity: 'success', summary: 'Success Message',
    detail: 'Project added successfully!'
  });
}
openModal(proj:Project): void {
  this.ModalOpened = true;
  this.currentProject = proj;
  console.log(this.currentProject);
  }



  openAssignModal(task: Task) {
   this.ModalAssignOpened = true;
    this.currentTask = task;
  }

  assignTaskToUser(taskId: number): void {

    this.taskService.assignTaskToUser(taskId,this.selectedConsultant.userName)
      .subscribe(() => {
        console.log('Project assigned successfully');
        this.ModalAssignOpened = false;
        location.reload();
      },
      (error) => {
        console.log('Error assigning project', error);
      });
  }


  isTaskOpened(index: number): boolean {
    return this.openedTaskIndexes.includes(index);
  }
  openModalStep(step: Step): void {
  this.ModalStepOpened = true;
    this.currentStep = step;
    console.log(this.currentStep)
  }
  loadRoles() {
    this.roleservice.getAllRoles().subscribe(
      (role: Role[]) => {
        this.role = role;
        console.log(this.role)
      },
      (error) => {
        console.error('Error loading roles:', error);
      }
    );
  }

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }
  onSubmitStepForm(projectId: number) {
    console.log(projectId)

    if (this.step.name && this.step.startDate && this.step.endDate) {
      if (this.step.startDate < this.step.endDate) {
        this.stepService.addStep(projectId, this.step).subscribe((res) => {
          console.log(res)
          location.reload();
        })
      } else {

        this.ErrorExist = true;
      }

    } else {
      setTimeout(() => {
       alert("invalid Form")
     },1000)
    }
  }
  Liststeps() {
    this.stepService.getAllSteps().subscribe(res => {
      this.steps = res

    })
  }
  onSubmitTaskForm() {

    if (this.task.taskDescription && this.task.dueDate) {
      this.taskService.addTask(this.currentStep.id, this.task).subscribe((res) => {
        console.log(res)
        location.reload();
      },
        err => {
        console.log(err)
      }
      );

    } else {
      console.error('Step id is null');
    }
  }
}
