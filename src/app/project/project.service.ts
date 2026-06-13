import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {equalTo, onValue, orderByChild, query, ref} from 'firebase/database';
import {FIREBASE_DATABASE} from '../../firebase.providers';
import {Project} from './project.interface';

@Injectable({providedIn: 'root'})
export class ProjectService {
  private db = inject(FIREBASE_DATABASE);

  getProjects(): Observable<Project[]> {
    return new Observable(observer => {
      const projectsRef = ref(this.db, '/projects');
      return onValue(
        projectsRef,
        snapshot => observer.next(snapshot.val() ? Object.values(snapshot.val()) as Project[] : []),
        error => observer.error(error)
      );
    });
  }

  getProject(url: string): Observable<Project[]> {
    return new Observable(observer => {
      const projectsRef = query(ref(this.db, '/projects'), orderByChild('id'), equalTo(url));
      return onValue(
        projectsRef,
        snapshot => observer.next(snapshot.val() ? Object.values(snapshot.val()) as Project[] : []),
        error => observer.error(error)
      );
    });
  }
}
