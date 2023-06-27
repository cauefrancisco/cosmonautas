import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IPostSample } from './../../shared/interfaces/post-sample.interface';


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

  public getPosts(): Observable<any> {
    return this._afs.collection('posts').snapshotChanges();
  }

  public getObjectById(id: string): Observable<any> {
    return this._afs.collection('posts').doc(id).valueChanges();
  }

  public deletePost(id: string) {
    return this._afs.collection('posts').doc(id).delete();
  }

  public updatePost(id: string, payload: IPostSample) {
    return this._afs.collection('posts').doc(id).update(payload);
  }
}
