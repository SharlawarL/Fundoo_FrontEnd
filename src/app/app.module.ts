import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './service/auth.service';
import { NotesService } from './service/notes.service';
import { DragDropModule} from '@angular/cdk/drag-drop'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field'
import { MatDatepicker } from '@angular/material/datepicker'
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
import { environment } from '../environments/environment';
import { NotesPipe } from './pipe/notes.pipe';
import { ReminderPipe } from './pipe/reminder.pipe';
import { TrashPipe } from './pipe/trash.pipe';
import { ArchivePipe } from './pipe/archive.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ReminderComponent,
    TrashComponent,
    NotesComponent,
    ArchiveComponent,
    ForgotComponent,
    ResetComponent,
    NotesPipe,
    ReminderPipe,
    TrashPipe,
    ArchivePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    DragDropModule,
    MatInputModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [AuthService,AuthGuard,NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }