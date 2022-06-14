import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AddUserComponent } from '../add-user/add-user.component';
import {
  AddUser,
  DeleteUser,
  GetAllDetail,
  UpdateUser,
} from '../store/actions/user.action';
import { UserState } from '../store/state/user.state';
import { User } from '../user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public details: User[] = [];
  @Select(UserState.getAllDetail) details$!: Observable<User[]>;
  @Select(UserState.userLoaded) userLoaded$!: Observable<boolean>;
  userLoadedSub!: Subscription;
  id: string = '';

  constructor(
    private store: Store,
    private route: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllUserFromServer();
    this.loading = true;
    this.details$.subscribe((res) => {
      this.details = res;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    });
  }

  getAllUserFromServer() {
    this.userLoadedSub = this.userLoaded$.subscribe((Loadeduser) => {
      if (!Loadeduser) {
        this.store.dispatch(new GetAllDetail());
      }
    });
    // this.loading = true;
    // this.detail.getAllDetail().subscribe((data: user[]) => {
    //   this.details = data;
    //   this.loading = false;
    // });
  }

  addUserDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: 'auto',
      height: 'auto',
      data: 'add',
    });
  }

  public deleteuser(id: string): any {
    Swal.fire({
      title: 'Are you sure?',

      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-outline-success mx-2',
        cancelButton: 'btn btn-outline-danger mx-2',
      },
      buttonsStyling: false,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          this.store.dispatch(new DeleteUser(id));
          // this.detail.deleteUser(id).subscribe((data: {}) => {
          //   this.getAllUserFromServer();
          // });
        }
      }
    });
  }

  editUserDialog(user: User) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: 'auto',
      height: 'auto',
      data: user,
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }

  ngOnDestroy() {
    this.userLoadedSub.unsubscribe();
  }
}
