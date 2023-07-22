import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { ListUsersWithProjectsComponent } from './list-users-with-projects/list-users-with-projects.component';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [


    ListUsersWithProjectsComponent
  ],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    AccordionModule,
    CardModule
  ]
})
export class AdminPagesModule { }
