import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {Observable} from 'rxjs';
import {Project} from './project.interface';

@Injectable()
export class ProjectService {

  constructor(public af: AngularFireDatabase) {
  }

  getProjects(): Observable<Project[]> {
    return this.af.list<Project>('/projects').valueChanges();
  }

  getProject(url: string): Observable<Project[]> {
    return this.af.list<Project>('/projects', ref => ref.orderByChild('id').equalTo(url)).valueChanges();
  }
}
