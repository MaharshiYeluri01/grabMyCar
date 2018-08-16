import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { rides } from './posts.service';
import *as firebase from 'firebase'
export interface rideId extends rides { id: string; }
@Injectable({
  providedIn: 'root'
})
export class RetriveRidesService {
  private rideCollection: AngularFirestoreCollection<rides>;
  ridesWithIds: Observable<rideId[]>;
  userRides;
  constructor(private readonly afs: AngularFirestore) { }
  getRides() {
    this.rideCollection = this.afs.collection<rides>('rides');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    return this.ridesWithIds = this.rideCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as rides;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }
  getUserrides(uid) {
    this.rideCollection  = this.afs.collection<rides>('rides',ref=>ref.where('userUid','==',uid))
    return this.userRides = this.rideCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as rides;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getSearchRides(startsAt,endsAt) {
    this.rideCollection = this.afs.collection<rides>('rides',ref=>ref.where('startsAt','==',startsAt).where('endsAt','==',endsAt));
    
    return this.ridesWithIds = this.rideCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as rides;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }
 daleteRide(id){
   this.afs.collection('rides').doc(id).delete()
 }
}
