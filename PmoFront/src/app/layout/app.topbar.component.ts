import {OverlayPanel} from 'primeng/overlaypanel';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    op !: OverlayPanel;
    items!: MenuItem[];
  user = new User();
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
        public userService: UserService,
        public userAuthService: UserAuthService,
        public router: Router,private authService:UserAuthService) { }

     ngOnInit() {
       this.user = this.authService.getUser();
       console.log(this.user)
      }

        public isLoggedIn() {
            return this.userAuthService.isLoggedIn();
          }

          public logout() {
            this.userAuthService.clear();
            this.router.navigate(['/auth/login']);
          }

          public isAdmin() {
            return this.userAuthService.isAdmin();

          }
          public isUser(){
            return this.userAuthService.isUser();

          }
}
