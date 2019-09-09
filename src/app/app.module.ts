import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NotesComponent } from './notes/notes.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { NotesDataComponent } from './notes-data/notes-data.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { NotesService } from './notes.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReminderComponent } from './reminder/reminder.component';
import { TrashComponent } from './trash/trash.component';
import { ArchiveComponent } from './archive/archive.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    NotesComponent,
    ForgotComponent,
    ResetComponent,
    NotesDataComponent,
    DashboardComponent,
    ReminderComponent,
    TrashComponent,
    ArchiveComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
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
        //canActivate: [AuthGuard]
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
    ])
  ],
  providers: [AuthService,AuthGuard,NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export const rountingComponent = [DashboardComponent,
  NotesComponent,ReminderComponent,ArchiveComponent,TrashComponent]