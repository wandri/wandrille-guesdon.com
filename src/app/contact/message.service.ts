import {inject, Injectable} from '@angular/core';
import {push, ref} from 'firebase/database';
import {FIREBASE_DATABASE} from '../../firebase.providers';

@Injectable({providedIn: 'root'})
export class MessageService {
  private db = inject(FIREBASE_DATABASE);

  sendMessage(item: Record<string, unknown>): Promise<unknown> {
    return Promise.resolve(push(ref(this.db, 'emails'), item));
  }
}
