import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public navbar = document.getElementById("navbar");
  public isLogged: any;


  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) {
    this.navbar = document.getElementById("navbar");
  }

  ngOnInit() {
    // this._authService.currentAuthStatus.subscribe((authStatus: any) => this.isLogged = authStatus)
    // console.log(this.isLogged, 'isLoogged')
  }

  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }

  public logout() {
    this._authService.logout();
  }
}
