import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminComponent } from './admin/admin.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EdituserComponent } from './edituser/edituser.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { UserComponent } from './user/user.component';

import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/add', component: AddUserComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/edit/:id',
    component: EditUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/view/:id',
    component: ViewUserComponent,
    canActivate: [AuthGuard],
  },
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard] },
  {
    path: 'user/edituser/:id',
    component: EdituserComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
