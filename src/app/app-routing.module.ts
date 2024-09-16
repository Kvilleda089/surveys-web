import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsSurveysComponent } from './components/forms-surveys/forms-surveys.component';
import { AuthenticateGuard } from './authenticate.guard';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticateGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'create-survey', component: FormsSurveysComponent, canActivate: [AuthenticateGuard]},
  { path: 'create-survey/:id', component: FormsSurveysComponent, canActivate: [AuthenticateGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
