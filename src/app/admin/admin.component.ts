import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { DeleteUser, GetAllDetail } from '../store/actions/user.action';
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

  constructor(private store: Store, private route: Router) {}

  ngOnInit(): void {
    this.getAllUserFromServer();
    this.details$.subscribe((res) => {
      this.details = res;
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

  public deleteuser(id: string): any {
    if (id) {
      this.store.dispatch(new DeleteUser(id));
      // this.detail.deleteUser(id).subscribe((data: {}) => {
      //   this.getAllUserFromServer();
      // });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }

  ngOnDestroy() {
    this.userLoadedSub.unsubscribe();
  }
}
