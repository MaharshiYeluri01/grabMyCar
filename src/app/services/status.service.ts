import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { rides } from './posts.service';
import *as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  constructor(private readonly afs: AngularFirestore) { }
  getRideStatus(currentUser,requestedTo) {
  let statusCollection=  this.afs.collection<any>(`users`).doc(currentUser).collection(requestedTo);
   return statusCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
  }
}
