import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../register/user.service';
import jwt_decode from 'jwt-decode';
import {Username} from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  username;
  isLoggedIn = true;

  constructor(private userService: UserService) {
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
}
