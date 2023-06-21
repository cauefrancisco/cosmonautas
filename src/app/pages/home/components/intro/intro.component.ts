import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/core/services/posts.service';
import { IPostSample } from 'src/shared/interfaces/post-sample.interface';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  public title: Array<string>;
  public description: Array<string | undefined>;
  public content: Array<string>;
  public img: Array<string>;
  public data: Array<IPostSample>

  constructor(
    private _postService: PostsService,
  ) {
    this.data = this._postService.getPosts();
    this.title = this.data.map(item => item.title);
    this.description = this.data.map(item => item.description);
    this.content = this.data.map(item => item.text);
    this.img = this.data.map(item => item.img);
  }

  ngOnInit() {
    this.getPosts();
    console.log('titulos', this.title);
  }

  getPosts(): void {
    this._postService.getPosts();
    console.log('titulos', this.title);
  }
}
