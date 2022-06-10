import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../user';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent implements OnInit {
  public id!: string | null;
  public detail!: User;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private editservice: LoginService
  ) {}

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id');
    });
    if (this.id) {
      this.editservice.getDetail(this.id).subscribe((data: User) => {
        this.detail = data;
      });
    }
  }

  updateSubmit(id: any) {
    if (this.id) {
      this.editservice
        .updateUser(this.detail, this.id)
        .subscribe((data: User) => {
          this.router.navigate([`user/${id}`]).then();
        });
    }
  }

  back(id: any) {
    this.router.navigate([`user/${id}`]);
  }
}
