import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-slack-settings',
  templateUrl: './slack-settings.component.html',
  styleUrls: ['./slack-settings.component.scss']
})

export class SlackSettingsComponent implements OnInit {
  token: Object = '';

  constructor(private apiService: ApiService, private router: Router, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  addToken(form: any): void {
    if (form.form.status === 'VALID') {
      this.apiService.postSlackToken(form.value).subscribe(data => {
        this.token = data;
      });
    }
  }

  addChannel(form: any): void {
    this.apiService.postChannel(form.value).subscribe(data => {
      this.token = data;
    });
  }
}
