import { TestBed } from '@angular/core/testing';

import { MessagingService } from './messaging.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../../environments/environment';
import { AngularFireDatabase,AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NotifierModule } from 'angular-notifier';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

describe('MessagingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule ,
      AngularFireDatabaseModule,
      AngularFireMessagingModule,
      ToastrModule.forRoot(),
      NotifierModule
    ],
    providers:[MessagingService,AngularFirestore]
  }));

  it('should be created', () => {
    const service: MessagingService = TestBed.get(MessagingService);
    expect(service).toBeTruthy();
  });
});
