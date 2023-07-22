import { Component } from '@angular/core';
import { Task } from 'src/app/_model/task.model';
import { TaskService } from 'src/app/_services/task.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { RoleService } from '../../../../_services/role.service';
import { Role } from 'src/app/_model/role.model';
import { User } from 'src/app/_model/user.model';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  tasks: Task[] = [];
  roles: Role[] = [];
  role = "";
  user = new User();
  searchByname = "";
  taskEdited = new Task();
  items :string[] =[]

  constructor(private taskservice :TaskService,private authservice:UserAuthService){}
  getTasks() {
    this.taskservice.getTasks().subscribe(res => {
      this.tasks = res
      this.tasks = this.tasks.filter(task => task.user?.userName == this.user.userName)
      console.log(this.tasks)
    }
    )
  }
  getTaskProgressType() {
    this.taskservice.getTaskProgressType().subscribe(res => {
      this.items = res
      this.items = this.items.filter(item => item != "TODO")
      console.log(this.items)
    })
  }
  changeProgressType(idTask: number,item :string) {
    this.taskservice.EditTask(idTask, item).subscribe({
      next:(data) => {
          this.taskEdited = data
        this.getTasks();

      },
      error:(err) => {
        console.log("An error was occured : " + err);
      }
    })

}
  clear(table: Table) {
    table.clear();
}

  ngOnInit() {
    this.getTasks();
    this.getTaskProgressType();
    this.roles = this.authservice.getRoles()
    this.role = this.roles[0].roleName;
    this.user = this.authservice.getUser();
    console.log(this.user)
  }

}
