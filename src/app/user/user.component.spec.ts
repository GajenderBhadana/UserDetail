import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from '../app.module';
import { LoginService } from '../services/login.service';
import { User } from '../user';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let el: DebugElement;
  let service: any;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('LoginService', ['getDetail']);
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: LoginService, useValue: serviceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    service = TestBed.get(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user', () => {
    service.getDetail();
    const listGroup = el.query(By.css('.list-group'));

    expect(listGroup).toBeTruthy('Could not find listGroup');
  });
});
