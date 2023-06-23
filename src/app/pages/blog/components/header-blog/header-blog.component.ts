import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-blog',
  templateUrl: './header-blog.component.html',
  styleUrls: ['./header-blog.component.scss']
})
export class HeaderBlogComponent implements OnInit {
  public isMenuOpen: boolean = false

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }

  public goTo(page: string): void {
    this._router.navigateByUrl(page)
  }
}
