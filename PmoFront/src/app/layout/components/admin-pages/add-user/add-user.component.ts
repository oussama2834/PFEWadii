import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/_model/project.model';
import { Role } from 'src/app/_model/role.model';
import { User } from 'src/app/_model/user.model';
import { RoleService } from 'src/app/_services/role.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  userForm: FormGroup;
  successMessage: string = '';
 errorMessage: string = '';
  roles!: Role[];
  users!: User[];
  projects!: Project[];
  selectedRole!: Role;
  Exists !: boolean;
  ActiveSpinner = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.userForm = this.formBuilder.group({
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userName: ['', Validators.required],
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
      roleName: ['', Validators.required]
    });



  }
  ngOnInit(): void {

    this.loadRoles();
    this.loadUsers();
  }
//   showError() {
//     this.messageservice.add({
//       severity: 'error', summary: 'Error',
//       detail: ' username is already taken'
//     });
//   }
//   showSuccess() {
//     this.messageservice.add({
//       severity: 'success', summary: 'Success',
//       detail: 'User created successfully'
//     });
// }


  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    this.ActiveSpinner = true;
    const user: User = {
      userFirstName: this.userForm.value.userFirstName,
      userLastName: this.userForm.value.userLastName,
      userName: this.userForm.value.userName,
      userEmail: this.userForm.value.userEmail,
      userPassword: this.userForm.value.userPassword,
      role: [],
      projects: [],
      tasks: []

    };

    const roleName = this.userForm.value.roleName;
    const username = this.userForm.value.userName;
    this.userService.existsbyusername(username).subscribe(res => {
      this.Exists = res
      console.log(this.Exists)
      if (!this.Exists) {
        this.userService.createUserWithRole(user, roleName)
          .subscribe(
            (response) => {

              console.log('User created successfully!', response);
              this.successMessage = "user added successfully!";
              // this.showSuccess();
              // this.userForm.reset();

              this.loadUsers();

              this.ActiveSpinner = false;
            },
            (error) => {
              console.log('Error creating user:', error);
              // Handle error
            }
          )
      }
      // this.showError();

    })
  }




  loadUsers() {
    this.userService.getAllUsersWithRoles().subscribe(
      (users: User[]) => {
        this.users = users;

      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }




  loadRoles() {
    this.roleService.getAllRoles().subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      },
      (error) => {
        console.error('Error loading roles:', error);
      }
    );
  }


  onDelete(userName: string) {
    this.userService.deleteUser(userName).subscribe(
      response => {
        console.log(response);
        this.loadUsers();
        // refresh the list, show a success message, etc.
      },
      error => {
        console.error(error);
        // handle the error, show an error message, etc.
      }
    );
  }







}
