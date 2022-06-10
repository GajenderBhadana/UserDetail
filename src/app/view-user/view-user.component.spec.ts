import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxsModule, Store } from '@ngxs/store';
import { AppModule } from '../app.module';
import { SetSelectedUser } from '../store/actions/user.action';
import { UserState } from '../store/state/user.state';

import { ViewUserComponent } from './view-user.component';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;
  let el: DebugElement;
  let store: Store;

  beforeEach(async () => {
    const storeSpy = await TestBed.configureTestingModule({
      imports: [AppModule, NgxsModule.forRoot([UserState])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    store = TestBed.get(Store);
    store.reset(UserState);
    fixture.detectChanges();
  });

  it('should display user', () => {
    component.getUserbyId('2');
    const listGroup = el.queryAll(By.css('.list-group'));
    expect(listGroup).toBeTruthy('');
  });

  // it('should display the user', () => {
  //   const storeSpy = spyOn(store, 'dispatch').and.callThrough();
  //   component.getUserbyId('2');
  //   // store.dispatch(new SetSelectedUser('2'));
  //   const listGroup = el.queryAll(By.css('.list-group'));
  //   fixture.detectChanges();
  //   expect(storeSpy).toHaveBeenCalled();
  //   expect(listGroup).toBeTruthy('');
  // });
});
