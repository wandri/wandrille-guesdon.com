import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {CardComponent} from '../card/card.component';
import {MenuProject} from './project.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CardComponent, MatButton]
})
export class MainComponent implements OnInit {
  private titleService = inject(Title);

  readonly projects: MenuProject[] = [
    {
      title: 'My curriculum vitae',
      subTitle: 'Experiences',
      backgroundImagePath: 'assets/images/cv.jpg',
      backgroundColor: '#ffffff',
      logoPath: '',
      link: '/cv'
    },
    {
      title: 'Constream.fr',
      subTitle: 'Gamification of the health and safety at work for construction sites.',
      backgroundImagePath: 'assets/images/constream.jpg',
      backgroundColor: '#ffffff',
      logoPath: 'assets/images/constream-logo.svg',
      link: '/project/constream'
    },
    {
      title: 'Data visualization',
      subTitle: 'D3js Graphs',
      backgroundImagePath: 'assets/images/charts.jpg',
      backgroundColor: '#ffffff',
      logoPath: '',
      link: '/graph'
    }
  ];

  ngOnInit() {
    this.titleService.setTitle('Wandrille â€¢ home');
  }
}
