import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './_guard/auth.guard';

export const routes: Routes = [
  {path:'',component :  LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  { path: '**', component:LoginComponent}, //esta rota sempre por ultimo
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true
    })
  ],
  exports: [RouterModule],
  providers: [
    provideRouter(routes,withComponentInputBinding())
  ]
})
export class AppRoutingModule {}


