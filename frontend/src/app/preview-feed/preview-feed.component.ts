import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const Parser = require('rss-parser');

@Component({
  selector: 'app-preview-feed',
  templateUrl: './preview-feed.component.html',
  styleUrls: ['./preview-feed.component.scss']
})


export class PreviewFeedComponent implements OnInit {
  feed;
  feedItems: [];
  feedTitle;
  feedDesc;
  feedLink;
  feedString;
  feedArrayTest: string[] = [];
  feedKeys;
  feedEntryKeys;

  constructor(private apiService: ApiService, private router: Router, private httpClient: HttpClient) {  }

  ngOnInit(): void {  }

  previewFeed(form: any) {
    this.feedArrayTest = [];

    if (form.form.status === 'VALID') {
      const rssFeedUrl = encodeURIComponent(form.value.feedurl);

      this.apiService.getFeedPreview(rssFeedUrl).subscribe(data => {
        this.feedKeys = Object.keys(data);
        this.feedTitle = data['title'];
        this.feedLink = data['link'];
        this.feedDesc = data['description'];
        const feedItems = data['items'];
        this.feedEntryKeys = Object.keys(feedItems);
        this.createFeedItems(feedItems);
      });
    }
  }

  createFeedItems(object): void {
    for (const element1 of object) {
      this.feedEntryKeys = Object.keys(element1);
      const str = JSON.stringify(element1, null, 2);
      this.feedArrayTest.push(str);
    }
  }
}
