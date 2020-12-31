import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {UserService} from './user.service';
import jwt_decode from 'jwt-decode';

export class UserInfo {
  _id: string;
  username: string;
}

export class Response {
  token: string;
  status: string;
  statusCode: number;
}
export class Username {
  username: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  private loginText = 'Login';
  username;
  isLoggedIn = true;

  constructor(private apiService: ApiService,
              private router: Router,
              private httpClient: HttpClient,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.change.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (!isLoggedIn) {
        this.username = null;
      } else {
        this.username = (jwt_decode(localStorage.getItem('token')) as Username).username;
      }
    });
  }

  register(form: any): void {
    const username = form.value.username;
    const password = form.value.password;

    this.apiService.register(username, password).subscribe((data) => {
      const httpResp: HttpResponse<Object> = data as HttpResponse<Object>;
      const body = httpResp.body as unknown as Response;

      if (body.statusCode == 200) {
        const contents: Response = body;
        localStorage.setItem('token', contents.token);
        const someUser: UserInfo = jwt_decode(contents.token) as UserInfo;
        alert(`Thanks for registering, ${someUser.username}`);
        this.userService.toggle(true);
        this.loginText = 'Logout';
      } else {
        alert('Problem registering');
      }
    });
  }

  login(form: any): void {
    const username: string = form.value.username;
    const password: string = form.value.password;

    this.apiService.login(username, password).subscribe(data => {
      const httpResp: HttpResponse<Object> = data as HttpResponse<Object>;
      const body: Response = httpResp.body as unknown as Response;

      if (body.statusCode == 200) {
        const contents: Response = body;
        localStorage.setItem('token', contents.token);
        const someUser: UserInfo = jwt_decode(contents.token) as UserInfo;
        alert(`You logged in, ${someUser.username}`);
        this.loginText = 'Logout';
        this.userService.toggle(true);
      } else {
        alert(`Problem logging in`);
      }
    });
  }

  logout(): void {
    alert('Logged off');
    this.loginText = 'Login';
    this.userService.toggle(false);
    localStorage.removeItem('token');
  }
}
