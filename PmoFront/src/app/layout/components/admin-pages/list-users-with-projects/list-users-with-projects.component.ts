import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/user.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-list-users-with-projects',
  templateUrl: './list-users-with-projects.component.html',
  styleUrls: ['./list-users-with-projects.component.scss']
})
export class ListUsersWithProjectsComponent implements OnInit {
  users: User[] = [];
  roles: string[] = [];  // Store role names

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.userService.getUsersWithProjects().subscribe(users => {
      this.users = users;
      // Extract unique role names from users
      this.roles = Array.from(new Set(users.flatMap(user => user.role.map(r => r.roleName))));
    });
  }

  userHasRole(user: User, roleName: string): boolean {
    return user.role.some(r => r.roleName === roleName);
  }
}
