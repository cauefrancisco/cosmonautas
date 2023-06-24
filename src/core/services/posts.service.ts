import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IPostSample } from 'src/shared/interfaces/post-sample.interface';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  public posts: Array<IPostSample>;

  constructor(
    private _afs: AngularFirestore,
  ) {
    this.posts = []
  }


  public createPost(post: IPostSample) {
    post.id = this._afs.createId();
    return this._afs.collection('posts').add(post);
    // this.posts.push(post);
  }

  public getPosts() {
    return this._afs.collection('posts').snapshotChanges();
  }

  public getObjectById(id: string) {
    return this._afs.collection('posts').doc(id).valueChanges();
  }
}
