import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  allEntriesJson: object[] = [];

  constructor(private apiService: ApiService, private router: Router, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getEntries();
  }

  getEntries(): void {
    this.apiService.getEntries().subscribe((data: []) => {
      this.allEntriesJson = [];

      for (let i = 0; i < data.length; i++) {
        this.allEntriesJson.push(data[i]);
      }
    });
  }

  favorite(item: object): void {
    const finalItem = item;

    this.apiService.postFavorite(finalItem).subscribe(data => {
      console.log('put the fav: ', data);
    });
  }

  deleteEntry(item: object): void {
    const entryId = item['_id'];
    const finalItem = entryId;

    this.apiService.deleteEntry(finalItem).subscribe(data => {
      this.allEntriesJson = [];
      this.getEntries();
    });
  }
}
