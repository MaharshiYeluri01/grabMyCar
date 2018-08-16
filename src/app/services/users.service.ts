import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument

} from "angularfire2/firestore";
import * as firebase from 'firebase/app';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  username
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  constructor(private afs: AngularFirestore) {
   this.itemsCollection = afs.collection<any>("users");
    this.items = this.itemsCollection.valueChanges();
  }
  addItem(rideId, username, item, ridingwith, currentseats,requestedBy,confirmed,requests) {
    const id = username
    this.username = username
    item = { id, item };
  
    this.itemsCollection.doc(id).collection(ridingwith).add(item).then((res) => {
      let ref = this.afs.doc<any>(`rides/${rideId}`);
      ref.valueChanges();
      ref.update({ seats: currentseats - 1 ,requestedBy:requestedBy,confirmed:confirmed,requests:requests-1});
    })
  }
  
 
}
