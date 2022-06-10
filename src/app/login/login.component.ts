import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get username() {
    return this.loginForm.get('username');
  }

  constructor(private authService: LoginService, private route: Router) {}

  ngOnInit(): void {}

  login() {
    this.authService.login().subscribe((res) => {
      const user = [...res];
      const detail = user.find(
        (a) =>
          a.username === this.loginForm.value.username &&
          a.password === this.loginForm.value.password
      );
      if (detail == null) {
        alert('Uername or password is wrong');
      } else {
        localStorage.setItem('token', detail.role);

        if (detail && detail.role === 'admin') {
          this.route.navigate(['admin']);
        }
        if (detail && detail.role === 'user') {
          this.route.navigate([`user/${detail.id}`]);
        }
        if (detail && !detail.role) {
          this.route.navigate([`user/${detail.id}`]);
        }
      }
    });
  }
}
