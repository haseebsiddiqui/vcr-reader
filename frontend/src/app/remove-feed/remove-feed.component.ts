import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {element} from 'protractor';

@Component({
  selector: 'app-remove-feed',
  templateUrl: './remove-feed.component.html',
  styleUrls: ['./remove-feed.component.scss']
})

export class RemoveFeedComponent {
  feedArrayTest: string[] = [];

  constructor(private apiService: ApiService, private router: Router, private httpClient: HttpClient) {
    this.getFeeds();
  }

  removeFeed(form: any): void {
    if (form.form.status === 'VALID') {
      const feedToRemove = form.value.feedurl;

      this.apiService.deleteFeed(feedToRemove).subscribe(data => {
        console.log('should have deleted the feed: ', data);
      });
    }

    this.feedArrayTest = [];
    this.getFeeds();
  }

  getFeeds(): any {
    this.apiService.getFeeds().subscribe((data: []) => {

      for (let i = 0; i < data.length; i++) {
        const str2 = JSON.stringify(data[i], null, 2);
        this.feedArrayTest.push(str2);
      }
    });
  }
}
