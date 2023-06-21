import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedStatus: boolean = false;
  public currentAuthStatus: any;

  constructor(
    private _auth: AngularFireAuth,
    private _router: Router,
  ) {
    this._auth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this._router.navigate(['']);
      } else {
        localStorage.setItem('my-test-app-currentUser', '');
      }
    });
  }

  public signIn() {
    return this._auth.signInWithPopup(new GoogleAuthProvider());
  }

  public registerWithEmailAndPassword(user: { email: string, password: string }) {
    return this._auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  public signInEmailAndPassword(user: { email: string, password: string }) {
    return this._auth.signInWithEmailAndPassword(user.email, user.password);
  }

  //  currentUser;
  // let authStatusSub = new BehaviorSubject(currentUser);
  // let currentAuthStatus = authStatusSub.asObservable();

  // public authStatusListener() {
  //   this._auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log(user);
  //       authStatusSub.next(user);
  //       console.log('User is logged in');
  //     }
  //     else {
  //       this.authStatusSub.next(null);
  //       console.log('User is logged out');
  //     }
  //   })
  // }

  public logout() {
    this._auth.signOut().then(() => {
      console.log('deslogouu');
      this.loggedStatus = false;
      this._router.navigateByUrl('home');
    });
  }

}
