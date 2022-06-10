import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';
import { SetSelectedUser, UpdateUser } from '../store/actions/user.action';
import { UserState } from '../store/state/user.state';
import { User } from '../user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  public id!: string | null;
  public detail!: User;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private editservice: LoginService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id');
    });
    if (this.id) {
      // this.getUserbyId(this.id);
      // this.updateSubmit(this.id);
      // this.details$.subscribe((res) => {
      //   this.detail = res;
      // });
      this.editservice.getDetail(this.id).subscribe((data: User) => {
        this.detail = data;
      });
    }
  }
  // getUserbyId(id: string) {
  //   this.store.dispatch(new SetSelectedUser(id));
  //   this.selectedUserSub = this.detail$.subscribe((res) => {
  //     this.detail = res;
  //   });
  //   // this.view.getDetail(id).subscribe((data: user) => {
  //   //   this.detail = data;
  //   // });
  // }

  updateSubmit() {
    if (this.id) {
      this.store
        .dispatch(new UpdateUser(this.detail, this.id))
        .subscribe((data: User) => {
          this.router.navigate(['admin']).then();
        });
      // this.editservice
      //   .updateUser(this.detail, this.id)
      //   .subscribe((data: user) => {
      //     this.router.navigate(['admin']).then();
      //   });
    }
  }

  // public isNotEmpty() {
  //   return Object.keys(this.detail).length > 0;
  // }

  back() {
    this.router.navigate(['admin']);
  }

  // ngOnDestroy() {
  //   this.selectedUserSub.unsubscribe();
  // }
}
