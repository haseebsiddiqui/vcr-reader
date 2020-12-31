import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import express from 'express';
import {ObjectID} from 'mongodb';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  API_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public postFeed(feed: object) {
    console.log("postFeed | api.service.ts");
    return this.httpClient.post(`${this.API_URL}/api/feeds`, feed);
  }

  public postEntry(feed: object) {
    console.log("postEntry | api.service.ts");
    return this.httpClient.post(`${this.API_URL}/api/entries`, feed);
  }

  public postFavorite(fav: object) {
    console.log("postFavorite | api.service.ts", fav);
    return this.httpClient.post(`${this.API_URL}/api/favorites`, fav);
  }

  public postSlackToken(feed: object) {
    console.log("postSlackToken | api.service.ts");

    if (localStorage.getItem('token') !== null) {
      console.log('given token', localStorage.getItem('token'))
      const header = {
        headers: new HttpHeaders()
          .set('Authorization', localStorage.getItem('token'))
      };
      return this.httpClient.post(`${this.API_URL}/api/slack`, feed, header);
    } else {
      return this.httpClient.post(`${this.API_URL}/api/slack`, feed);
    }

    // return this.httpClient.post(`${this.API_URL}/api/slack`, feed);
  }

  public postToSlack(item: object) {
    console.log("postToSlack | api.service.ts");
    return this.httpClient.post(`${this.API_URL}/api/slack/send`, item);
  }

  public postChannel(item: object) {
    console.log("postChannel | api.service.ts");
    return this.httpClient.post(`${this.API_URL}/api/slack/channel`, item);
  }

  public getFavorites() {
    console.log("getFavorites | api.service.ts");
    return this.httpClient.get(`${this.API_URL}/api/favorites`);
  }

  public getFeeds() {
    console.log("getFeeds | api.service.ts");
    return this.httpClient.get(`${this.API_URL}/api/feeds`);
  }

  public getFeedPreview(feedUrl: string) {
    console.log("getFeedPreview | api.service.ts");
    return this.httpClient.get(`${this.API_URL}/api/feeds/preview/${feedUrl}`);
  }

  public getEntries() { //todo authentication?
    console.log("getEntries | api.service.ts");
    return this.httpClient.get(`${this.API_URL}/api/entries`);
  }

  public getSlackToken(userId: object) {
    console.log("getSlackToken | api.service.ts");
    return this.httpClient.get(`${this.API_URL}/api/slack/${userId}`);
  }

  public getLatestTokenById(userId: string) {
    console.log("getLatestTokenById | api.service.ts");
    return this.httpClient.get(`${this.API_URL}/api/slack/${userId}`);
  }

  public refreshFeeds() {
    console.log("refreshFeeds | api.service.ts");
    return this.httpClient.get(`${this.API_URL}/api/refresh`);
  }

  public deleteFeed(feedUrl: string) {
    console.log("deleteFeed | api.service.ts");
    /*if (localStorage.getItem('token') !== null) {
      const header = {
        headers: new HttpHeaders()
          .set('Authorization', localStorage.getItem('token'))
      };
      return this.httpClient.delete(`${this.API_URL}/api/posts/${feedUrl}`, header);
    } else {*/
    console.log('deleteFeed returning ', `${this.API_URL}/api/feeds/${feedUrl}`);
    return this.httpClient.delete(`${this.API_URL}/api/feeds/${feedUrl}`);

    //}
  }

  public deleteEntry(entryID: string) {
    console.log("deleteEntry | api.service.ts");

    console.log('deleteEntry returning ', `${this.API_URL}/api/entries/${entryID}`);
    return this.httpClient.delete(`${this.API_URL}/api/entries/${entryID}`);
  }

  public deleteFavorite(fav: string) {
    console.log("deleteFeed | api.service.ts");

    console.log('deleteFavorite returning ', `${this.API_URL}/api/favorites/${fav}`);
    return this.httpClient.delete(`${this.API_URL}/api/favorites/${fav}`);
  }

  public register(username: string, password: string) {
    return this.httpClient.post(`${this.API_URL}/api/register`,
      {'username': username, 'password': password}, {observe: 'response'});
  }

  public login(username: string, password: string){
    return this.httpClient.post(`${this.API_URL}/api/login`,
      {'username': username, 'password': password}, {observe: 'response'});
  }

  public getTokenById(userID: string) {
    return this.httpClient.get(`${this.API_URL}/api/users/${userID}/token`);
  }

  public getChannelById(channel: string) {
    return this.httpClient.get(`${this.API_URL}/api/users/${channel}/channel`);
  }
}
