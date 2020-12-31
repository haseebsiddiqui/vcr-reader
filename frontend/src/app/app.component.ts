import {Component, OnInit} from '@angular/core';
import { timer } from 'rxjs';
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
// 1000 == 1 second
const timer$ = timer(1800000, 1800000);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  static globalRefreshTimer: 1800;
  title = 'frontend';

  constructor(private apiService: ApiService, private router: Router, private httpClient: HttpClient) {

  }

  static getRefreshTimer() {
    return this.globalRefreshTimer;
  }

  ngOnInit() {
    AppComponent.globalRefreshTimer = 1800;

    timer$.subscribe(tick => {
      this.apiService.refreshFeeds().subscribe(data => {
        console.log('timer refresh data ', data);
      }, error => {
        console.log('timer refresh error: ', error);
      });
    });
  }
}
