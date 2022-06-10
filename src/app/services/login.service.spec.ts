import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { LoginService } from './login.service';
import { User } from '../user';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });
    service = TestBed.get(LoginService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrive all user', () => {
    service.getAllDetail().subscribe((users) => {
      expect(users).toBeTruthy('No user returned');
      expect(users.length).toBe(5, ' incorrect number of courses');
    });
    const req = httpTestingController.expectOne('http://localhost:3000/users');
    expect(req.request.method).toEqual('GET');
  });

  it('should find a user by id', (done) => {
    service.getDetail('2').subscribe((user) => {
      expect(user).toBeTruthy();
      expect(user.id).toBe('2');
    });
    const req = httpTestingController.expectOne(
      'http://localhost:3000/users/2'
    );
    expect(req.request.method).toEqual('GET');
    done();
  });

  it('should update the user', (done) => {
    const user: User = {
      id: '2',
      username: 'sarah',
      exp: '4',
      country: 'england',
      password: '123',
      role: 'user',
    };
    service.updateUser(user, '2').subscribe((user) => {
      expect(user.id).toBe('12');
    });
    const req = httpTestingController.expectOne(
      'http://localhost:3000/users/2'
    );
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.exp).toEqual(user.exp);
    done();
  });

  it('should create the user', (done) => {
    const user: User = {
      id: '5',
      username: 'Adarsh',
      exp: '4',
      country: 'england',
      password: '123',
      role: 'user',
    };
    service.createUser(user).subscribe();
    const req = httpTestingController.expectOne('http://localhost:3000/users');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.id).toEqual(user.id);
    expect(req.request.body.username).toEqual(user.username);
    expect(req.request.body.exp).toEqual(user.exp);
    expect(req.request.body.country).toEqual(user.country);
    expect(req.request.body.password).toEqual(user.password);
    expect(req.request.body.role).toEqual(user.role);
    done();
  });

  it('should delete the user', (done) => {
    service.deleteUser('2').subscribe((user) => {
      expect(user).toBeTruthy();
    });
    const req = httpTestingController.expectOne(
      'http://localhost:3000/users/2'
    );
    expect(req.request.method).toEqual('DELETE');
    done();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
