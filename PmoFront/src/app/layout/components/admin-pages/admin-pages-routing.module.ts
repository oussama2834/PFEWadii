import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/_auth/auth.guard';
import { ListUsersWithProjectsComponent } from './list-users-with-projects/list-users-with-projects.component';

const routes: Routes = [
  {path:'',redirectTo:'addUser',pathMatch:'full'},
  { path: 'addProject', loadChildren: () => import('./add-project/add-project.module').then(m => m.AddProjectModule), canActivate: [AuthGuard], data: { roles: ['Admin','pmo'] } },
  { path: 'addUser', loadChildren: () => import('./add-user/add-user.module').then(m => m.AddUserModule),  canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'addRole', loadChildren: () => import('./add-role/add-role.module').then(m => m.AddRoleModule), canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  {
    path: 'userswprojects', component: ListUsersWithProjectsComponent,
    canActivate: [AuthGuard], data: { roles: ['Admin', 'pmo'] }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
