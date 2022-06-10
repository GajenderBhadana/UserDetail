import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { SetSelectedUser } from '../store/actions/user.action';
import { UserState } from '../store/state/user.state';
import { User } from '../user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit, OnDestroy {
  public detail: User = {} as User;
  public id!: string | null;
  @Select(UserState.selectedUser) detail$!: Observable<User>;

  selectedUserSub!: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id');
      if (this.id) {
        this.getUserbyId(this.id);
      }
    });
    // if (this.id) {
    //   this.view.getDetail(this.id).subscribe((data: user) => {
    //     this.detail = data;
    //   });
    // }
  }

  getUserbyId(id: string) {
    this.store.dispatch(new SetSelectedUser(id));
    this.selectedUserSub = this.detail$.subscribe((res) => {
      this.detail = res;
    });
    // this.view.getDetail(id).subscribe((data: user) => {
    //   this.detail = data;
    // });
  }

  public isNotEmpty() {
    return Object.keys(this.detail$).length > 0;
  }

  back() {
    this.router.navigate(['admin']);
  }

  ngOnDestroy() {
    this.selectedUserSub.unsubscribe();
  }
}
