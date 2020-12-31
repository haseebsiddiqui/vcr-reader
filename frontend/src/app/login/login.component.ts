import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router, private httpClient: HttpClient) {  }

  ngOnInit(): void {
  }

  login(form: any) {
    const username = form.value.name;
    const password = form.value.password;
  }
}
