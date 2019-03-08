import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  medias: Media[] = [];

  constructor() {
  }

  ngOnInit() {
    this.medias = [{
      name: 'linkedin',
      link: 'https://www.linkedin.com/in/wandrille-guesdon-53a54684/',
      imageLink: '../../assets/images/linkedin.svg'
    }, {
      name: 'github',
      link: 'https://github.com/wandri',
      imageLink: '../../assets/images/github_white.svg'
    }];
  }

}

interface Media {
  name: string;
  link: string;
  imageLink: string;
}
