import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header-blog',
  templateUrl: './header-blog.component.html',
  styleUrls: ['./header-blog.component.scss']
})
export class HeaderBlogComponent implements OnInit {
  public isMenuOpen: boolean = false
  public isLogged!: boolean;


  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) { }

  ngOnInit() {
    this.isLogged = this._authService.isLoggedIn();
    console.log('is logged in', this.isLogged);
  }

  ngDoCheck() {
    this.isLogged = this._authService.isLoggedIn();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }

  public goTo(page: string): void {
    this._router.navigateByUrl(page)
  }
}
