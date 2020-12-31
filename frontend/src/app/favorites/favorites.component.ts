import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import jwt_decode from 'jwt-decode';

var axios = require('axios');

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent implements OnInit {
  favEntries: string[] = [];
  favEntriesJson: object[] = [];
  slackToken = 'xoxb-YOUR-TOKEN_HERE';

  constructor(private apiService: ApiService, private router: Router, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getFavs();
    this.getSlackToken();
  }


  getFavs(): void {
    this.apiService.getFavorites().subscribe((data: []) => {
      this.favEntriesJson = [];
      this.favEntries = [];

      for (let i = 0; i < data.length; i++) {
        this.favEntriesJson.push(data[i]);
      }

      this.favEntriesJson.forEach((entry) => {
        const str2 = JSON.stringify(entry, null, 2);
        this.favEntries.push(str2);
      });
    });
  }

  deleteFav(item: string): void {
    const finalItem = JSON.parse(item)['_id'];

    this.apiService.deleteFavorite(finalItem).subscribe(data => {
      this.favEntries = [];
      this.favEntriesJson = [];
      this.getFavs();
    });
  }

  sendSlack(item: string): void {
    const finalItem = JSON.parse(item);
    finalItem['token'] = this.slackToken;

    this.apiService.postToSlack(finalItem).subscribe(data => {
      console.log('should have slacked: ', finalItem);
    });
  }

  getSlackToken(): void {
    const userId = jwt_decode(localStorage.getItem('token'))['_id'];

    this.apiService.getLatestTokenById(userId).subscribe((data) => {
      this.slackToken = data[0]['slackToken']['slackToken'];
    });
  }
}
