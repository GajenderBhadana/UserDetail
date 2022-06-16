import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    exp: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });

  constructor(
    private store: Store,
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
  }

  updateSubmit() {
    if (!this.editForm.valid) {
      alert('Please Fill the Form Detail');
      return;
    } else {
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
