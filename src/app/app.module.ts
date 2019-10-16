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
import { LebelPipe } from './pipe/lebel.pipe';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule,AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  Ng6SocialButtonModule,SocialServiceConfig  } from "ng6-social-button";
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { MessagingService } from './service/messaging.service';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NotifierModule } from 'angular-notifier';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {DatePipe} from '@angular/common';
import {CommonModule} from "@angular/common";
import {
  GoogleApiModule, 
  GoogleApiService, 
  GoogleAuthService, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";
import { SearchPipe } from './pipe/search.pipe';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "624358407601-0h4ldc7mlb8b8ijcjj4bm0g57j4qhr73.apps.googleusercontent.com",
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  scope: [
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/analytics"
  ].join(" ")
};

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("624358407601-0h4ldc7mlb8b8ijcjj4bm0g57j4qhr73.apps.googleusercontent.com")

  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("938843183144702")
  }
]);
// Configs
export function getAuthServiceConfigs() {
  let config = new SocialServiceConfig()
      .addFacebook("938843183144702")
      .addGoogle("Your-Google-Client-Id")
      .addLinkedIn("Your-LinkedIn-Client-Id");
  return config;
}


export function provideConfig() {
  return config;
}


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
    ArchivePipe,NotesPipe,ReminderPipe,TrashPipe,LebelPipe,SearchPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    DragDropModule,
    MatInputModule,
    RouterModule,
    AppRoutingModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    NotifierModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    Ng6SocialButtonModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  exports:[ArchivePipe, NotesPipe,ReminderPipe,TrashPipe,LebelPipe,SearchPipe,],
  providers: [
    AuthService,AuthGuard,NotesService,MessagingService, AsyncPipe,DatePipe,AngularFirestore,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: SocialServiceConfig,
      useFactory: getAuthServiceConfigs
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }