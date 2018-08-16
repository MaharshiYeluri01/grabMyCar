import { Injectable } from '@angular/core';
import {AngularFirestoreDocument,AngularFirestore} from 'angularfire2/firestore'
import {Observable} from 'rxjs';
import { rides } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class GetRideService {
  private itemDoc: AngularFirestoreDocument<rides>;
  item: Observable<rides>;
  constructor(private afs: AngularFirestore) {   
  }
  updateRide(id,item) {
    this.itemDoc = this.afs.doc<rides>(`rides/${id}`);
    this.item = this.itemDoc.valueChanges();
    this.itemDoc.update(item);
  }
  getoneRide(id){
    this.itemDoc = this.afs.doc<rides>(`rides/${id}`);
    return this.item = this.itemDoc.valueChanges();
  }
}
