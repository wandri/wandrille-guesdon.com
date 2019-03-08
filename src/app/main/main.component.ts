import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MenuProject} from './project.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  projects: MenuProject[] = [];

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Wandrille • home');
    this.projects = [
      {
        title: 'My curriculum vitae',
        subTitle: 'Experiences',
        backgroundImagePath: '../../assets/images/cv.jpg',
        backgroundColor: '#ffffff',
        logoPath: '',
        link: '/cv'
      },
      {
        title: 'Constream.fr',
        subTitle: 'Gamification of the health and safety at work for construction sites.',
        backgroundImagePath: '../../assets/images/constream.jpg',
        backgroundColor: '#ffffff',
        logoPath: '../../assets/images/constream-logo.svg',
        link: '/project/constream'
      },
      {
        title: 'Data visualization',
        subTitle: 'D3js Graphs',
        backgroundImagePath: '../../assets/images/charts.jpg',
        backgroundColor: '#ffffff',
        logoPath: '',
        link: '/graph'
      }
    ];
  }

}
