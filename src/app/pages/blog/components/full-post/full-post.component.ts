import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.scss']
})
export class FullPostComponent implements OnInit {
  public postId!: string;
  public data!: any;
  public imgPost: string = '/assets/imgs/tarot-post.jpg';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _postsService: PostsService,
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
  }

  public goBack(): void {
    this._router.navigateByUrl('blog');
  }

}
