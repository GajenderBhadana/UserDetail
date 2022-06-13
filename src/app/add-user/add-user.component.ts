import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { AddUser, UpdateUser } from '../store/actions/user.action';
import { User } from '../user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  public detail: User = {} as User;

  title = 'Add User';

  addForm = new FormGroup({
    id: new FormControl(''),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    exp: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private store: Store,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data !== 'add') {
      this.title = 'Edit User';
      this.addForm.patchValue({
        id: this.data.id,
        username: this.data.username,
        exp: this.data.exp,
        country: this.data.country,
        password: this.data.password,
      });
    } else {
      this.addForm.reset();
    }
  }

  createSubmit() {
    if (!this.addForm.valid) {
      alert('Please Fill the Form Detail');
    } else {
      this.dialogRef.close(this.addForm.value);
    }

    if (this.addForm.value?.id !== null) {
      let { id, ...rest } = this.addForm.value;
      this.store.dispatch(new UpdateUser(rest, id)).subscribe((data: User) => {
        // this.router.navigate(['admin']).then();
      });
    } else {
      this.store
        .dispatch(new AddUser(this.addForm.value))
        .subscribe((data: User) => {
          // this.router.navigate(['admin']).then();
        });
    }
  }

  back() {
    this.addForm.reset();
    this.dialogRef.close();
  }
}
