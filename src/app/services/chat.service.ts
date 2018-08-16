import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private itemsCollection:AngularFirestoreCollection;
  private itemDoc:AngularFirestoreDocument;
  items: Observable<any>;
  constructor(private readonly afs: AngularFirestore) {
   
    this.itemsCollection = this.afs.collection<any>(`allchats`);
    this.items = this.itemsCollection.valueChanges();
  }
  addItem(chats,postId,userid) {
   
    //Persist a document id
    this.itemDoc = this.afs.doc<any>(`${postId}/chats/${userid}`);
    this.itemDoc.set(chats)
  

  }
}
