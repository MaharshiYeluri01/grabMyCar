import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { Observable } from "rxjs";
export interface rides {
  startsAt:String,
  endsAt:String,
  price:number,
  seats:number,
  phone:number,
  date:Date,
  username:String
}
@Injectable({
  providedIn: "root"
})
export class ridesService {
  private itemsCollection: AngularFirestoreCollection<rides>;
  items: Observable<rides[]>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<rides>("rides");
    this.items = this.itemsCollection.valueChanges();
  }
  addItem(item: rides) {
    this.itemsCollection.add(item);
  }
}
