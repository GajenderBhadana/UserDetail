import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../user';
import { Store } from '@ngxs/store';
import { SetSelectedUser, UpdateUser } from '../store/actions/user.action';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent implements OnInit {
  public id!: string | null;
  public detail!: User;
  disabled: boolean = true;

  editForm = new FormGroup({
    id: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    exp: new FormControl(''),
    country: new FormControl(''),
  });

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private store: Store,
    private editservice: LoginService,
    public dialogRef: MatDialogRef<EdituserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    if (this.data) {
      console.log('data', this.data);
      this.editForm.patchValue({
        id: this.data.id,
        username: this.data.username,
        password: this.data.password,
        exp: this.data.exp,
        country: this.data.country,
      });
    } else {
      this.editForm.reset();
    }
    // this.activatedroute.paramMap.subscribe((param: ParamMap) => {
    //   this.id = param.get('id');
    // });
    // if (this.id) {
    //   this.editservice.getDetail(this.id).subscribe((data: User) => {
    //     this.detail = data;
    //   });
    // }
  }

  updateSubmit() {
    if (this.editForm.value) {
      let { id, ...rest } = this.editForm.value;
      console.log(this.editForm.value);

      this.store.dispatch(new UpdateUser(rest, id)).subscribe((data: User) => {
        this.store.dispatch(new SetSelectedUser(id));
        this.dialogRef.close(this.editForm.value);
      });
    }
  }

  back() {
    this.editForm.reset();
    this.dialogRef.close();
  }
}
