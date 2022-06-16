import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { EdituserComponent } from '../edituser/edituser.component';
import { SetSelectedUser } from '../store/actions/user.action';
import { UserState } from '../store/state/user.state';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public detail: User = {} as User;
  public id: string | null = null;
  @Select(UserState.selectedUser) detail$!: Observable<User>;

  selectedUserSub!: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id');
      if (this.id) {
        this.getDetail(this.id);
      }
    });
  }

  getDetail(id: string) {
    this.store.dispatch(new SetSelectedUser(id));
    this.selectedUserSub = this.detail$.subscribe((res) => {
      this.detail = res;
    });
  }

  editUserDialog(user: User) {
    const dialogRef = this.dialog.open(EdituserComponent, {
      width: 'auto',
      height: 'auto',
      data: user,
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  edit(id: any) {
    this.router.navigate([`user/edituser/${id}`]);
  }
}
