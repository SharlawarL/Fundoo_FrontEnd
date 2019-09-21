import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReminderComponent } from './reminder/reminder.component';
import { TrashComponent } from './trash/trash.component';
import { ArchiveComponent } from './archive/archive.component';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {
    path : 'login',
    component:LoginComponent
  },
  {
    path : 'register',
    component:RegisterComponent
  },
  {
    path : '',
    component:HomeComponent
  },
  {
    path : 'notes',
    component:NotesComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'forgot',
    component:ForgotComponent
  }
  ,
  {
    path : 'reset',
    component:ResetComponent
  },
  {
    path : 'dashboard',
    component: DashboardComponent,
    children:[
      { path:'notes', component: NotesComponent },
      { path:'reminder', component: ReminderComponent },
      { path:'archive', component: ArchiveComponent },
      { path:'trash', component: TrashComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const rountingComponent = [DashboardComponent,
  NotesComponent,ReminderComponent,ArchiveComponent,TrashComponent]
