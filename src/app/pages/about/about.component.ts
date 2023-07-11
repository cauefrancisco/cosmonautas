import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import JSON_DATA_FEED_URL from './../../../assets/JSON_DATA_FEED_URL.json'


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public totalAngularPackages: any;

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) { }

  ngOnInit() {

  }

  public goTo(page: string): void {
    this._router.navigateByUrl(page)
  }
};

