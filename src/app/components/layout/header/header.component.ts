import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public navbar = document.getElementById("navbar");
  public sticky: any;


  constructor() {
    this.sticky = this.navbar?.offsetTop;
    this.navbar = document.getElementById("navbar");
  }

  ngOnInit() {
    window.onscroll = this.stickyBar();
  }

  public stickyBar(): any {
    if (window.scrollY >= this.sticky) {
      this.navbar?.classList.add("sticky")
    } else {
      this.navbar?.classList.remove("sticky");
    }
  }

}
