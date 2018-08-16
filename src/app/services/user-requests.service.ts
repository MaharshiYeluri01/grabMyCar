import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { rides } from './posts.service';
import *as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class UserRequestsService {
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  constructor(private afs: AngularFirestore) {
    
  }
  addItem(item: any) {
    this.itemsCollection = this.afs.collection<any>('userRequests');
    this.items = this.itemsCollection.valueChanges();
    this.itemsCollection.add(item);
  }
  getUserRequests(username){
    let result= this.afs.collection<any>('userRequests',ref=>ref.where('requestedBy','==',username));
               return result.valueChanges()
  }
  
}
