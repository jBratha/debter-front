import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_guards/auth.guard';
import {AdminComponent} from './admin/admin.component';
import {Role} from './_models/role';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {DebtComponent} from './debt/debt.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {title: 'Strona główna'}
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'debts',
    component: DebtComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
