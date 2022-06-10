import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public detail: User = {} as User;
  public id: string | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private view: LoginService
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
    this.view.getDetail(id).subscribe((data: User) => {
      console.log(data);
      this.detail = data;
    });
  }

  logout() {
    this.router.navigate(['login']);
  }

  edit(id: any) {
    this.router.navigate([`user/edituser/${id}`]);
  }
}
