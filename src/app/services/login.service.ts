import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl: string = '';

  url: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:3000/users';
  }

  // for login
  login(): Observable<any> {
    return this.http.get<any>(this.loginUrl);
  }

  // For Auth Guard
  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  // Get all user
  public getAllDetail(): Observable<User[]> {
    let dataURL: string = `${this.url}/users`;
    return this.http.get<User[]>(dataURL).pipe();
  }

  // Get Single user
  public getDetail(id: string): Observable<User> {
    let dataURL: string = `${this.url}/users/${id}`;
    return this.http.get<User>(dataURL).pipe();
  }

  // Create user
  public createUser(user: User): Observable<User> {
    let dataURL: string = `${this.url}/users`;
    return this.http.post<User>(dataURL, user).pipe();
  }
  // Update user
  public updateUser(user: User, id: string): Observable<User> {
    let dataURL: string = `${this.url}/users/${id}`;
    return this.http.put<User>(dataURL, user).pipe();
  }
  // Delete user
  public deleteUser(id: string): Observable<{}> {
    let dataURL: string = `${this.url}/users/${id}`;
    return this.http.delete(dataURL).pipe();
  }
}
