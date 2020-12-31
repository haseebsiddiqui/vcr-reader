import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppComponent} from "../app.component";

const Parser = require('rss-parser');
const parser = new Parser();

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html',
  styleUrls: ['./add-feed.component.scss']
})

export class AddFeedComponent implements OnInit {
  feed;
  allFeeds: string[] = [];
  refreshTimer = AppComponent.getRefreshTimer();

  constructor(private apiService: ApiService, private router: Router, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getFeeds();
    this.refreshTimer = AppComponent.getRefreshTimer();
  }

  newFeed(form: any): void {
    if (form.form.status === 'VALID') {
      this.apiService.postFeed(form.value).subscribe(data => {
        this.feed = data;
      });

      this.allFeeds = [];
      this.getFeeds();
    }
  }

  getFeeds(): any {
    this.apiService.getFeeds().subscribe((data: []) => {
      for (let i = 0; i < data.length; i++) {
        const str2 = JSON.stringify(data[i], null, 2);
        this.allFeeds.push(str2);
      }
    });
  }

  forceRefresh(): any {
    this.apiService.refreshFeeds().subscribe(data => {
      console.log('fr data ', data);
    }, error => {
      console.log('fre error: ', error);
    });
  }

  deleteFeed(item: string): void {
    const finalItem = JSON.parse(item)['_id'];

    this.apiService.deleteFeed(finalItem).subscribe(data => {
      this.allFeeds = [];
      this.getFeeds();
    });
  }
}
