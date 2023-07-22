import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './layout/components/auth-layout/login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import { ProjectDetailComponent } from './layout/components/pmo-pages/project-detail/project-detail.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      { path: "", redirectTo: "/auth/login", pathMatch: "full" },
      {
        path: 'auth', loadChildren: () =>
          import('./layout/components/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },


  {
    path: 'dashboard', component: AppLayoutComponent,  children: [
      { path: 'adminPages', loadChildren: () => import('./layout/components/admin-pages/admin-pages.module').then(m => m.AdminPagesModule)},
      { path: 'PmoPages', loadChildren: () => import('./layout/components/pmo-pages/pmo-pages.module').then(m => m.PmoPagesModule) },
      { path: 'PmPages', loadChildren: () => import('./layout/components/pm-pages/pm-pages.module').then(m => m.PmPagesModule) },
      { path: 'ConsultantPages', loadChildren: () => import('./layout/components/consultant-pages/consultant-pages.module').then(m => m.ConsultantPagesModule) },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
