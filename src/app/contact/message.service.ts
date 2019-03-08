import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable()
export class MessageService {

  constructor(private db: AngularFireDatabase) {
  }

  sendMessage(item: any) {
    return this.db.list('emails').push(item);
  }
}
