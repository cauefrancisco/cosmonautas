import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  public isLogged!: boolean;


  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.isLogged = this._authService.isLoggedIn();
    console.log('is logged in', this.isLogged);
  }

  ngDoCheck() {
    this.isLogged = this._authService.isLoggedIn();
  }

  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }

  public logout() {
    this._authService.logout();
    this.isLogged;
  }
}
