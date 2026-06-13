import {inject, InjectionToken} from '@angular/core';
import {Database, getDatabase} from 'firebase/database';
import {FirebaseApp, initializeApp} from 'firebase/app';
import {firebaseConfig} from './firebase-config';

export const FIREBASE_APP = new InjectionToken<FirebaseApp>('firebase-app', {
  providedIn: 'root',
  factory: () => initializeApp(firebaseConfig)
});

export const FIREBASE_DATABASE = new InjectionToken<Database>('firebase-database', {
  providedIn: 'root',
  factory: () => getDatabase(inject(FIREBASE_APP))
});
