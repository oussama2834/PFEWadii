import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/_auth/auth.guard';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

const routes: Routes = [
  {
    path:'',redirectTo:'projects',pathMatch:'full'
  },
  {
    path: 'projects', component: ProjectComponent,
    canActivate: [AuthGuard], data: { roles: ['Admin', 'pmo'] },

  },
  { path: 'project/:id', component: ProjectDetailComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmoPagesRoutingModule { }
