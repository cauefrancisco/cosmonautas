import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GoogleAuthProvider, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedStatus: boolean = false;
  public currentAuthStatus: any;
  userData: any; // Save logged in user data


  constructor(
    private _auth: AngularFireAuth,
    public afs: AngularFirestore,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this._auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  public signIn() {
    return this._auth.signInWithPopup(new GoogleAuthProvider()).then((result) => {
      this.SetUserData(result.user);
      this._auth.authState.subscribe((user) => {
        if (user) {
          this._snackBar.open('Logado com sucesso!');
          this._router.navigateByUrl('home');
        }
      })
      this._router.navigateByUrl('home');
    }).catch((error: Error) => {
      this._snackBar.open(error.message);
    })
  }

  public SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    } as User;
    return userRef.set(userData, {
      merge: true,
    });
  }

  public registerWithEmailAndPassword(user: { email: string, password: string }) {
    return this._auth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
      this._router.navigateByUrl('home');
    });
  }

  public isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    // return user !== null && user.emailVerified !== false ? true : false; // Depois, verificar email e alterar para esta verificação.
    return user !== null;
  }

  public signInEmailAndPassword(user: { email: string, password: string }) {
    return this._auth.signInWithEmailAndPassword(user.email, user.password).then((result) => {
      this.SetUserData(result.user);
      this._auth.authState.subscribe((user) => {
        if (user) {
          this._snackBar.open('Logado com sucesso!');
          this.isLoggedIn();
          this._router.navigateByUrl('home');
        }
      });
      this._router.navigateByUrl('home');
    }).catch((error: Error) => {
      this._snackBar.open(error.message);
    });
  };

  public logout() {
    this._auth.signOut().then(() => {
      console.log('deslogouu');
      localStorage.removeItem('user');
      this.isLoggedIn();
      this._router.navigateByUrl('home');
    });
  }

}
