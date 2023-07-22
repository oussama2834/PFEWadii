import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  valCheck: string[] = ['remember'];
  error = false;
  password!: string;
  validform = false;

  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    public layoutService: LayoutService) { }



  ngOnInit(): void { }
//   show() {
//     this.messageService.add({
//       severity: 'success', summary: 'Success', detail:
//         'Message Content'
//     });
// }
  login(loginForm: NgForm) {
    this.validform = false;
    this.error = false;
    if (loginForm.value.userName !='' && loginForm.value.userPassword !='' ) {
      this.userService.login(loginForm.value).subscribe(
        (response: any) => {
          this.userAuthService.setRoles(response.user.role);
          this.userAuthService.setToken(response.jwtToken);
          this.userAuthService.setUser(response.user);
          const role = response.user.role[0].roleName;
          if (role === 'Admin') {
            this.router.navigate(['/dashboard/adminPages']);
          } else if (role === 'pmo') {
            this.router.navigate(['/dashboard/PmoPages']);

          }
          else if (role === 'consultant') {
            this.router.navigate(['dashboard/ConsultantPages']);
          } else if (role === 'pm') {
            // this.router.navigate(['/pm']);
            this.router.navigate(['/dashboard/PmPages']);
          } else {
            this.router.navigate(['/user']);
          }
        },
        (error) => {
          console.log(error);
          this.error = true;
        }
      );
    } else {

      this.validform = true;
    }


  console.log(this.error)
  }
}
