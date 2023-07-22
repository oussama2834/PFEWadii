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
import { Role } from 'src/app/_model/role.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProjectComponent {
  statuses!: any[];
  successMessage: string = '';
  msgs: Message[] = [];
  loading: boolean = true;

  activityValues: number[] = [0, 100];

ErrorExist =false
  projects: any[] = [];
  projectBeingEdited: number | null = null;
  step: any = {};
  assignProjectId!: number;
  assignProject = new Project();
  users: User[] = [];
  selectedUser!: User;
  assignModalOpened = false;
  projectStepsViewed: number | null = null;
  productDialog: boolean = false;
  projectForm: FormGroup | undefined;
  value5: any;
  searchByname = "";
  project = new Project();
  lits_pms: User[] = [];
  // project: Project = {
  //   projectName: "",
  //   projectDescription: "",
  //   sponsor: "",
  //   domain: "",
  //   nature: "",
  //   startDate: new Date(),
  //   endDate: new Date(),
  // };
  roles :Role[]= [];
  rolename = "";
  constructor(private projectService: ProjectService,
    private stepService: StepService, private userService: UserService,
    private userAuthService: UserAuthService) {

  }
  ngOnInit() {
    this.roles = this.userAuthService.getRoles();
    this.rolename = this.roles[0].roleName;
    console.log(this.rolename)
    this.getProjects();
    this.getUsers();
    this.List_pms();

  }
  compareDate(startDate : Date,endDate:Date) {
    if (startDate > endDate) {
      return true;
    }
    return false;
  }

  clear(table: Table) {
    table.clear();
}

  getUsers(): void {
    this.userService.getAllUsers()
      .subscribe(users => this.users = users);
  }
  getProjects() {
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
  List_pms() {
    this.userService.List_pms().subscribe(res => {
    this.lits_pms = res
    })
  }

  addStepClicked(project: any) {
    this.projectBeingEdited = project.projectId;
    this.step = {};
  }
  openNew() {
    this.productDialog = true;

  }
  addProject(projectForm: NgForm) {
    if (projectForm.valid) {
 {

        if (this.project.startDate < this.project.endDate) {
          this.projectService.addProject(this.project).subscribe(
            (response: Project) => {
              console.log(response);
              this.successMessage = 'Project added successfully!';
              projectForm.reset();
              this.getProjects();
              this.hideDialog();


            },
            (error: HttpErrorResponse) => {
              console.log(error)
            }
          );
        } else {

          this.ErrorExist = true;
        }

      }
    }
  }
  hideDialog() {
    this.productDialog = false;
}


showSuccessViaMessages() {
  this.msgs = [];
  this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Project added successfully!' });
}


  onSubmitStepForm() {
    if (this.projectBeingEdited !== null) {
      this.stepService.addStep(this.projectBeingEdited, this.step).subscribe(() => {
        this.getProjects();
        this.projectBeingEdited = null;
      });
    } else {
      console.error('Project id is null');
      // Handle this error appropriately
    }
  }



  openAssignModal(proj:Project): void {
     this.assignModalOpened = true;
    this.assignProject = proj;
}

  assignProjectToUser(userId: string, projectId: number): void {
    this.userService.assignProjectToUser(userId, projectId)
      .subscribe(() => {
        console.log('Project assigned successfully');
        this.assignModalOpened = false;
        window.location.reload();
      },
      (error) => {
        console.log('Error assigning project', error);
      });
  }



  toggleStepsView(projectId: number) {
    if (this.projectStepsViewed === projectId) {
        this.projectStepsViewed = null;  // if currently viewed project's steps are clicked again, it collapses
    } else {
        this.projectStepsViewed = projectId;  // set the current project as the project being viewed
    }
}

isStepsViewed(projectId: number): boolean {
    return this.projectStepsViewed === projectId;
}
}
