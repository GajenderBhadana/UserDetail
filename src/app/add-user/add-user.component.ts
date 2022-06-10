import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddUser } from '../store/actions/user.action';
import { User } from '../user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  public detail: User = {} as User;

  addForm = new FormGroup({
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

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {}

  createSubmit() {
    if (!this.addForm.valid) {
      alert('Please Fill the Form Detail');
    } else {
      this.store.dispatch(new AddUser(this.detail)).subscribe((data: User) => {
        this.router.navigate(['admin']).then();
      });
    }
    // this.adds.createUser(this.detail).subscribe((data: user) => {
    //   this.router.navigate(['admin']).then();
    // });
  }

  back() {
    this.router.navigate(['admin']);
  }
}
