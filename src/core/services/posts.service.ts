import { Injectable } from '@angular/core';
import { IPostSample } from 'src/shared/interfaces/post-sample.interface';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  public posts: Array<IPostSample>;

  constructor(
  ) {
    this.posts = []
  }


  public addPost(payload: IPostSample) {
    this.posts.push(payload)
    console.log(this.posts);
  }

  public getPosts(): Array<IPostSample> {
    return this.posts;
  }
}
