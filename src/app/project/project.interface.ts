import {SafeResourceUrl} from '@angular/platform-browser';

interface ProjectSection {
  title: string;
  description: string;
}

export interface Project {
  type: string;
  description: string;
  domain: string;
  id: string;
  name: string;
  projectName: string;
  projectPowerpoint: string | SafeResourceUrl;
  projectProblematic: string;
  projectRealisation: string;
  projectSolution: string;
  url: string;
  urlPicture: string;
  sections: ProjectSection[];
  period: string;
  projectAward: string;
  award: string;
}

export interface ReducedProject {
  title: string;
  subtitle: string;
  speciality: string;
  description: string;
  id: string;
  urlPicture: string;
}
