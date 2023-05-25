import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginGuard } from './guard/login.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { CompletedtaskComponent } from './components/completedtask/completedtask.component';
import { IncompletedtaskComponent } from './components/incompletedtask/incompletedtask.component';
import { ArchievedComponent } from './components/archieved/archieved.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { EdittaskComponent } from './components/edittask/edittask.component';
import { ViewnotificationComponent } from './components/viewnotification/viewnotification.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path: "", redirectTo: 'login', pathMatch:'full'},
  {path:"register",component:RegisterComponent},
  {path:"forget",component:ForgetpasswordComponent},
  {path:"home",component:HomeComponent,canActivate:[LoginGuard]},
  {path:"pgn",component:PageNotFoundComponent,canActivate:[LoginGuard]},
  {path:"header",component:HeaderComponent,canActivate:[LoginGuard]},
  {path:"completedtask",component:CompletedtaskComponent,canActivate:[LoginGuard]},
  {path:"incompletedtask",component:IncompletedtaskComponent,canActivate:[LoginGuard]},
  {path:"archievedtask",component:ArchievedComponent,canActivate:[LoginGuard]},
  {path:"searchbar",component:SearchbarComponent,canActivate:[LoginGuard]},
  {path:"edittask/:title",component:EdittaskComponent,canActivate:[LoginGuard]
  },
  {path:"notification",component:ViewnotificationComponent,canActivate:[LoginGuard]
  },
  {path:"**",component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
