import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }
  login() {
   return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    localStorage.removeItem('user')
   return this.afAuth.auth.signOut();
  }
  currentUser(){
    this.afAuth.user.subscribe(res=>{
      localStorage.setItem('user',JSON.stringify(res))
    })
  
    return this.afAuth.user
  }
  isLoggedIn(){
   return this.afAuth.authState
  }
}
