import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from '../app.module';
import { LoginService } from '../services/login.service';

import { EdituserComponent } from './edituser.component';

describe('EdituserComponent', () => {
  let component: EdituserComponent;
  let fixture: ComponentFixture<EdituserComponent>;
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
    fixture = TestBed.createComponent(EdituserComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    service = TestBed.get(LoginService);
    fixture.detectChanges();
  });
  it('should display user', () => {
    service.updateUser;
    const listGroup = el.queryAll(By.css('col-sm-4'));
    expect(listGroup).toBeTruthy('');
  });
});
