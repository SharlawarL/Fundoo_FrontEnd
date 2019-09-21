import { TestBed } from '@angular/core/testing';

import { NotesService } from './notes.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

describe('NotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [    
      RouterTestingModule,
      HttpClientTestingModule,
      HttpClientModule,
    ],
  }));

  it('should be created', () => {
    const service: NotesService = TestBed.get(NotesService);
    expect(service).toBeTruthy();
  });
});
