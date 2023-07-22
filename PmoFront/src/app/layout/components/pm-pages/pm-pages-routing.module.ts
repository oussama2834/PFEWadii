import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/_auth/auth.guard';
import { ProjectsPmComponent } from './projects-pm/projects-pm.component';

const routes: Routes = [
  {
    path:'',redirectTo:'projects',pathMatch:'full'
  }
  , {
    path: 'projects', component: ProjectsPmComponent,
    canActivate: [AuthGuard], data: { roles: ['pm'] }
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmPagesRoutingModule { }
