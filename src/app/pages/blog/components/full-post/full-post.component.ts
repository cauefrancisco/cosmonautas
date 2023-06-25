import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.scss']
})
export class FullPostComponent implements OnInit, AfterViewInit {
  public postId!: string;
  public data!: any;
  public imgPost: string = '/assets/imgs/tarot-post.jpg';
  public isLogged!: boolean;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _postsService: PostsService,
    private _authService: AuthService,
  ) {
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      console.log('post id', params['id']);
      this.postId = params['id'];
    });
    this._postsService.getObjectById(this.postId).subscribe(res => {
      console.log("res getObjectById", res);
      this.data = res;
    })
    this.isLogged = this._authService.isLoggedIn();
    console.log('is logged in', this.isLogged);
  }

  ngAfterViewInit() {

  }

  public goTo(page: string, id?: string): void {
    this._router.navigateByUrl(page);
  }

  public onEditPost(): void {
    this._router.navigateByUrl('blog/edit/' + this.postId);
  }
}
