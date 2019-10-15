import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ArchiveComponent } from './archive.component';
import { ArchivePipe } from '../pipe/archive.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Routes } from '@angular/router';
//import { UserModel } from '../../core/model/User/UserModel'


describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivePipe, ArchiveComponent ],
      imports: [RouterTestingModule.withRoutes([{ path: 'login', component: ArchiveComponent }]), RouterModule, BrowserModule],
    })
    .compileComponents();
  }));
});
